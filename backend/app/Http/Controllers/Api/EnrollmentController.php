<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\CourseOffering;
use App\Models\Course;

use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    // 🔹 GET MY ENROLLMENTS
public function index()
{
    return Enrollment::with([
        'courseOffering.course',
        'courseOffering.instructor',
        'courseOffering.semester'
    ])
    ->where('student_id', auth()->id())
    ->get();
}

    // 🔹 ENROLL
public function store(Request $request)
{
    $request->validate([
        'course_code' => 'required|string',
    ]);

    $user = auth()->user();

    // 1. find course
    $course = Course::where('course_code', $request->course_code)->first();

    if (!$course) {
        return response()->json(['error' => 'Invalid course code'], 404);
    }

    // 2. find offering for this course
    $offering = CourseOffering::where('course_id', $course->id)->first();

    if (!$offering) {
        return response()->json(['error' => 'Course not offered this semester'], 404);
    }

    // 3. check duplicate enrollment
    $exists = Enrollment::where('student_id', $user->id)
        ->where('course_offering_id', $offering->id)
        ->exists();

    if ($exists) {
        return response()->json(['error' => 'Already enrolled'], 409);
    }

    // 4. create enrollment
    $enrollment = Enrollment::create([
        'student_id' => $user->id,
        'course_offering_id' => $offering->id,
        'enrollment_date' => now(),
        'enrollment_status' => 'Enrolled',
        'is_active' => true,
    ]);

    return response()->json($enrollment->load('courseOffering.course'), 201);
}

    // 🔹 DROP COURSE
    public function destroy($id)
    {
        $enrollment = Enrollment::where('id', $id)
            ->where('student_id', Auth::id())
            ->firstOrFail();

        // 🔥 decrement counter
        $enrollment->offering->decrement('enrolled_students');

        $enrollment->delete();

        return response()->json(['message' => 'Dropped']);
    }
}
