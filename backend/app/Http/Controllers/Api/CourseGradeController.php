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
public function myGrades()
{
    return CourseGrade::with([
        'enrollment.courseOffering.course',
        'enrollment.courseOffering.semester',
    ])
    ->whereHas('enrollment', function ($q) {

        $q->where('student_id', auth()->id());

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

    $ca = $request->continuous_assessment_marks ?? 0;
    $mid = $request->midterm_exam_marks ?? 0;
    $final = $request->final_exam_marks ?? 0;

    $total = $ca + $mid + $final;

    // GPA + Letter
    if ($total >= 90) {
        $gradeLetter = 'A';
        $gpa = 4.0;
        $status = 'Pass';
    } elseif ($total >= 80) {
        $gradeLetter = 'B';
        $gpa = 3.0;
        $status = 'Pass';
    } elseif ($total >= 70) {
        $gradeLetter = 'C';
        $gpa = 2.0;
        $status = 'Pass';
    } elseif ($total >= 60) {
        $gradeLetter = 'D';
        $gpa = 1.0;
        $status = 'Pass';
    } else {
        $gradeLetter = 'F';
        $gpa = 0.0;
        $status = 'Fail';
    }

    $grade = CourseGrade::create([
        'enrollment_id' => $request->enrollment_id,

        'continuous_assessment_marks' => $ca,
        'midterm_exam_marks' => $mid,
        'final_exam_marks' => $final,

        'total_marks_obtained' => $total,

        'gpa_points' => $gpa,

        'letter_grade' => $gradeLetter,

        'grade_status' => $status,

        'graded_by' => auth()->id(),
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