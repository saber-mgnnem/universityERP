<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentPayment;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Barryvdh\DomPDF\Facade\Pdf;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class StudentPaymentController extends Controller
{
    // ================= GET PAYMENTS =================
    public function index(Request $request)
    {
        $student = $request->user()->studentProfile;

        $payments = StudentPayment::with('semester')
            ->where('student_id', $student->id)
            ->orderByDesc('created_at')
            ->get();

        // GROUP BY YEAR (NEW)
        $grouped = $payments->groupBy(function ($p) {
            return $p->created_at->format('Y');
        });

        // FORMAT
        $formatted = $payments->map(function ($p) {
            return [
                'id' => $p->id,
                'semester' => $p->semester->semester_name ?? 'N/A',
                'amount' => $p->amount_due,
                'paid' => $p->amount_paid,
                'dueDate' => $p->payment_due_date,
                'paidDate' => $p->payment_date,
                'status' => strtolower($p->payment_status),
                'type' => $p->payment_type,
            ];
        });

        $totalPaid = $payments->sum('amount_paid');
        $balance = $payments->sum(fn($p) => $p->amount_due - $p->amount_paid);

        // REMINDER LOGIC (NEW)
        $pending = $payments->where('payment_status', 'Pending');

        return response()->json([
            'payments' => $formatted,
            'grouped' => $grouped,
            'stats' => [
                'total_paid' => $totalPaid,
                'balance' => $balance,
                'next_payment' => optional($pending->first())->payment_due_date,
                'remaining_semesters' => $pending->count(),
            ]
        ]);
    }

    // ================= STRIPE SESSION =================
public function createStripeSession(Request $request)
{
    $request->validate([
        'plan' => 'required|in:1-semester,2-semester',
    ]);

    $student = $request->user()->studentProfile;

    $semesters = $request->plan === '2-semester' ? 2 : 1;
    $amount = 200 * $semesters;

    \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

    // FIX: always use env directly
    $frontend = rtrim(env('FRONTEND_URL'), '/');

    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => "Tuition ({$semesters} semester)",
                ],
                'unit_amount' => $amount * 100,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',

        'metadata' => [
            'student_id' => $student->id,
            'plan' => $request->plan,
            'semesters' => $semesters,
            'amount' => $amount,
        ],

        // ✅ FINAL REDIRECT HERE
        'success_url' => $frontend . '/student/payments?success=1',
        'cancel_url' => $frontend . '/student/payments?cancel=1',
    ]);

    return response()->json([
        'url' => $session->url
    ]);
}
    // ================= WEBHOOK =================
public function stripeWebhook(Request $request)
{
    \Log::info('Webhook hit');

    $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

    $payload = $request->getContent();
    $sig_header = $request->header('Stripe-Signature');

    try {
        $event = Webhook::constructEvent(
            $payload,
            $sig_header,
            $endpoint_secret
        );
    } catch (\Exception $e) {
        \Log::error('Webhook error: '.$e->getMessage());
        return response()->json(['error' => 'Invalid webhook'], 400);
    }

    \Log::info('Event type: '.$event->type);

    if ($event->type === 'checkout.session.completed') {

        $session = $event->data->object;

        \Log::info('Payment success', ['data' => $session]);

        StudentPayment::create([
            'student_id' => $session->metadata->student_id,
            'semester_id' => 1,
            'payment_type' => $session->metadata->plan,
            'amount_due' => $session->metadata->amount,
            'amount_paid' => $session->metadata->amount,
            'payment_status' => 'Paid',
            'payment_due_date' => now(),
            'payment_date' => now(),
            'transaction_reference' => $session->id,
        ]);
    }

    return response()->json(['status' => 'ok']);
}
    // ================= RECEIPT =================
    public function receipt($id)
    {
        $payment = StudentPayment::with('semester', 'student')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.receipt', compact('payment'));

        return $pdf->download('receipt-'.$payment->id.'.pdf');
    }
}