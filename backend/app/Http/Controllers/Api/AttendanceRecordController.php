<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AttendanceRecord;
use App\Models\Enrollment;

class AttendanceRecordController extends Controller
{
    // ================= GET ATTENDANCE =================
    public function index(Request $request)
    {
        $request->validate([
            'course_offering_id' => 'required|exists:course_offerings,id',
        ]);

        return AttendanceRecord::with('student')
            ->where('course_offering_id', $request->course_offering_id)
            ->orderBy('attendance_date', 'desc')
            ->get();
    }

    // ================= GET ENROLLED STUDENTS =================
    public function enrolledStudents(Request $request)
    {
        $request->validate([
            'course_offering_id' => 'required|exists:course_offerings,id',
        ]);

        return Enrollment::with('student')
            ->where('course_offering_id', $request->course_offering_id)
            ->where('enrollment_status', 'Enrolled')
            ->where('is_active', 1)
            ->get()
            ->map(fn($e) => [
                'student_id' => $e->student_id,
                'name' => $e->student->first_name . ' ' . $e->student->last_name,
            ]);
    }

    // ================= STORE (MARK ATTENDANCE) =================
    public function store(Request $request)
    {
        $request->validate([
            'course_offering_id' => 'required',
            'student_id' => 'required',
            'attendance_date' => 'required|date',
            'attendance_status' => 'required|in:Present,Absent,Late,Excused',
        ]);

        return AttendanceRecord::create([
            'course_offering_id' => $request->course_offering_id,
            'student_id' => $request->student_id,
            'attendance_date' => $request->attendance_date,
            'attendance_status' => $request->attendance_status,
            'recorded_by' => auth()->id(),
        ]);
    }

    // ================= UPDATE =================
    public function update(Request $request, $id)
    {
        $record = AttendanceRecord::findOrFail($id);

        $record->update([
            'attendance_status' => $request->attendance_status,
        ]);

        return $record;
    }

    // ================= DELETE =================
    public function destroy($id)
    {
        AttendanceRecord::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}