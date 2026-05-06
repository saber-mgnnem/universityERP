<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AcademicSession;

class AcademicSessionController extends Controller
{
    public function index()
    {
        return AcademicSession::with('semesters')->get();
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'session_name' => 'required|string',
        'session_year' => 'required|integer|unique:academic_sessions,session_year',
        'session_start_date' => 'required|date',
        'session_end_date' => 'required|date|after:session_start_date',
        'semester_count' => 'nullable|integer|min:1',
        'is_current_session' => 'boolean',
        'is_active' => 'boolean',
    ]);

    // ❌ منع وجود أكثر من session active
    if (!empty($validated['is_current_session']) && $validated['is_current_session']) {
        \App\Models\AcademicSession::where('is_current_session', true)
            ->update(['is_current_session' => false]);
    }

    // ✅ إنشاء السنة الدراسية
    $session = \App\Models\AcademicSession::create($validated);

    // 📅 تجهيز التواريخ
    $start = \Carbon\Carbon::parse($validated['session_start_date']);
    $end = \Carbon\Carbon::parse($validated['session_end_date']);

    $semesterCount = $validated['semester_count'] ?? 2;
    $monthsPerSemester = floor($start->diffInMonths($end) / $semesterCount);

    $today = now();

    for ($i = 1; $i <= $semesterCount; $i++) {

        $semesterStart = $start->copy()->addMonths(($i - 1) * $monthsPerSemester);

        if ($i === $semesterCount) {
            $semesterEnd = $end;
        } else {
            $semesterEnd = $semesterStart->copy()->addMonths($monthsPerSemester);
        }

        // ✅ تحديد الفصل الحالي تلقائياً
        $isCurrent = $today->between($semesterStart, $semesterEnd);

        // ✅ تواريخ التسجيل (قبل البداية بـ 1 شهر)
        $registrationStart = $semesterStart->copy()->subMonth();
        $registrationEnd = $semesterStart->copy()->subDays(3);

        \App\Models\Semester::create([
            'session_id' => $session->id,
            'semester_name' => "Semester $i",
            'semester_number' => $i,
            'start_date' => $semesterStart,
            'end_date' => $semesterEnd,
            'registration_start_date' => $registrationStart,
            'registration_end_date' => $registrationEnd,
            'is_current' => $isCurrent,
            'is_active' => true,
        ]);
    }

    return response()->json([
        'message' => 'Session created with smart semesters',
        'data' => $session->load('semesters')
    ], 201);
}

    public function show($id)
    {
        return AcademicSession::with('semesters')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $session = AcademicSession::findOrFail($id);
        $session->update($request->all());

        return response()->json($session);
    }

    public function destroy($id)
    {
        $session = AcademicSession::findOrFail($id);
        $session->delete();

        return response()->json(['message' => 'Deleted']);
    }
}