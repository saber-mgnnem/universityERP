<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class TimetableController extends Controller
{
public function studentTimetable()
{
    $studentId = Auth::id();

    $enrollments = Enrollment::with([
        'courseOffering.course',
        'courseOffering.instructor'
    ])
    ->where('student_id', $studentId)
    ->get();

    $timetable = [];

    foreach ($enrollments as $enroll) {
        $offering = $enroll->courseOffering;

        $day = $offering->course_schedule_day;

        $timetable[$day][] = [
            'code' => $offering->course->course_code,
            'title' => $offering->course->course_title,
            'time' => $offering->class_start_time . ' - ' . $offering->class_end_time,
            'room' => $offering->classroom_location,
            'instructor' =>
                $offering->instructor->first_name . ' ' . $offering->instructor->last_name,
        ];
    }

    return response()->json($timetable);
}}