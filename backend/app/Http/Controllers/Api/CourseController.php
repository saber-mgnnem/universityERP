<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Course;

class CourseController extends Controller
{
    // 🔹 GET ALL
    public function index()
    {
        return Course::with('department')->get();
    }

    // 🔹 STORE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_code' => 'required|unique:courses,course_code',
            'course_title' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'credit_hours' => 'required|integer',
            'max_enrollment' => 'required|integer',
            'coefficient' => 'required|in:1,1.5,2,3,4',
        ]);

        $course = Course::create([
            'course_code' => $request->course_code,
            'course_title' => $request->course_title,
            'department_id' => $request->department_id,
            'credit_hours' => $request->credit_hours,
            'max_enrollment' => $request->max_enrollment,
            'coefficient' => $request->coefficient,
            'is_active' => true
        ]);

        return response()->json($course, 201);
    }

    // 🔹 SHOW
    public function show($id)
    {
        return Course::with('department')->findOrFail($id);
    }

    // 🔹 UPDATE
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $course->update($request->all());

        return response()->json($course);
    }

    // 🔹 DELETE
    public function destroy($id)
    {
        Course::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}