<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PayrollRecord;

class PayrollRecordController extends Controller
{
    // ================= GET ALL =================
    public function index()
    {
        return PayrollRecord::with([
             'staff.user',
            'staff',
            'processor'
        ])->latest()->get();
    }

    // ================= CREATE =================
    public function store(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff_profiles,id',

            'payroll_month' => 'required|integer|min:1|max:12',

            'payroll_year' => 'required|integer',

            'basic_salary' => 'required|numeric',

            'allowances_total' => 'nullable|numeric',

            'deductions_total' => 'nullable|numeric',

            'income_tax' => 'nullable|numeric',

            'provident_fund' => 'nullable|numeric',

            'professional_tax' => 'nullable|numeric',

            'health_insurance_deduction' => 'nullable|numeric',

            'other_deductions' => 'nullable|numeric',

            'payment_status' => 'nullable|string',

            'payment_date' => 'nullable|date',

            'payment_method' => 'nullable|string',

            'transaction_reference' => 'nullable|string',

            'remarks' => 'nullable|string',
        ]);

        $grossSalary =
            $request->basic_salary +
            ($request->allowances_total ?? 0);

        $totalDeductions =
            ($request->deductions_total ?? 0) +
            ($request->income_tax ?? 0) +
            ($request->provident_fund ?? 0) +
            ($request->professional_tax ?? 0) +
            ($request->health_insurance_deduction ?? 0) +
            ($request->other_deductions ?? 0);

        $netSalary =
            $grossSalary - $totalDeductions;

        $payroll = PayrollRecord::create([
            'staff_id' => $request->staff_id,

            'payroll_month' => $request->payroll_month,

            'payroll_year' => $request->payroll_year,

            'basic_salary' => $request->basic_salary,

            'allowances_total' => $request->allowances_total ?? 0,

            'deductions_total' => $request->deductions_total ?? 0,

            'gross_salary' => $grossSalary,

            'income_tax' => $request->income_tax ?? 0,

            'provident_fund' => $request->provident_fund ?? 0,

            'professional_tax' => $request->professional_tax ?? 0,

            'health_insurance_deduction' =>
                $request->health_insurance_deduction ?? 0,

            'other_deductions' =>
                $request->other_deductions ?? 0,

            'net_salary' => $netSalary,

            'payment_status' =>
                $request->payment_status ?? 'Pending',

            'payment_date' => $request->payment_date,

            'payment_method' =>
                $request->payment_method ?? 'Bank Transfer',

            'transaction_reference' =>
                $request->transaction_reference,

            'processed_by' => auth()->id(),

            'processed_at' => now(),

            'remarks' => $request->remarks,
        ]);

        return response()->json($payroll, 201);
    }

    // ================= SHOW =================
    public function show(string $id)
    {
        return PayrollRecord::with([
            'staff',
            'processor'
        ])->findOrFail($id);
    }

    // ================= UPDATE =================
    public function update(Request $request, string $id)
    {
        $payroll = PayrollRecord::findOrFail($id);

        $grossSalary =
            $request->basic_salary +
            ($request->allowances_total ?? 0);

        $totalDeductions =
            ($request->deductions_total ?? 0) +
            ($request->income_tax ?? 0) +
            ($request->provident_fund ?? 0) +
            ($request->professional_tax ?? 0) +
            ($request->health_insurance_deduction ?? 0) +
            ($request->other_deductions ?? 0);

        $netSalary =
            $grossSalary - $totalDeductions;

        $payroll->update([
            ...$request->all(),

            'gross_salary' => $grossSalary,

            'net_salary' => $netSalary,
        ]);

        return response()->json($payroll);
    }

    // ================= DELETE =================
    public function destroy(string $id)
    {
        $payroll = PayrollRecord::findOrFail($id);

        $payroll->delete();

        return response()->json([
            'message' => 'Payroll deleted'
        ]);
    }
}