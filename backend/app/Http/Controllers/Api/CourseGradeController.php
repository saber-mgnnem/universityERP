<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseGrade;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class CourseGradeController extends Controller
{
   public function index(Request $request)
{
    $courseId = $request->query('course_offering_id');

    return \App\Models\CourseGrade::with(['enrollment.student'])
        ->whereHas('enrollment', function ($q) use ($courseId) {
            $q->where('course_offering_id', $courseId);
        })
        ->get();
}

    // ================= CREATE / UPDATE GRADE =================
   public function store(Request $request)
{
    $request->validate([
        'enrollment_id' => 'required|exists:enrollments,id',
        'continuous_assessment_marks' => 'nullable|numeric',
        'midterm_exam_marks' => 'nullable|numeric',
        'final_exam_marks' => 'nullable|numeric',
    ]);

    $grade = CourseGrade::create([
        'enrollment_id' => $request->enrollment_id,
        'continuous_assessment_marks' => $request->ca ?? 0,
        'midterm_exam_marks' => $request->midterm ?? 0,
        'final_exam_marks' => $request->final ?? 0,
        'graded_by' => auth()->id(),
        'grade_status' => 'Pending',
    ]);

    return response()->json($grade, 201);
}

    // ================= UPDATE =================
    public function update(Request $request, $id)
    {
        $grade = CourseGrade::findOrFail($id);

        $grade->update($request->all());

        return response()->json($grade);
    }

    // ================= DELETE =================
    public function destroy($id)
    {
        CourseGrade::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}