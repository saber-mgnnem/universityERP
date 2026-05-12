<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseOffering;
use App\Models\User;
use App\Models\Semester;

class CourseOfferingController extends Controller
{
    // 🔹 GET ALL
    public function index()
    {
        return CourseOffering::with(['course', 'semester', 'instructor'])->get();
    }
public function studentOfferings()
{
    $user = auth()->user();

    $departmentId = $user->studentProfile->department_id;

    return CourseOffering::with(['course', 'semester', 'instructor'])
        ->whereHas('course', function ($q) use ($departmentId) {
            $q->where('department_id', $departmentId);
        })
        ->get();
}

public function professorOfferings(Request $request)
{
    $user = $request->user();

    return CourseOffering::with(['course', 'semester', 'instructor'])
        ->where('instructor_id', $user->id)
        ->get();
}
public function professorSchedule()
{
    $user = auth()->user();

    return CourseOffering::with(['course', 'semester'])
        ->where('instructor_id', $user->id)
        ->orderBy('course_schedule_day')
        ->orderBy('class_start_time')
        ->get();
}
    // 🔹 CREATE (DEPARTMENT HEAD)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'semester_id' => 'required|exists:semesters,id',
            'instructor_id' => 'required|exists:users,id',
            'course_schedule_day' => 'required|string',
            'class_start_time' => 'required',
            'class_end_time' => 'required|after:class_start_time',
            'capacity' => 'required|integer',
            'classroom_location' => 'required|string',
        ]);

        // 🔥 CHECK instructor role
        $isProfessor = User::where('id', $validated['instructor_id'])
            ->whereHas('roles', fn($q) => $q->where('role_code', 'professor'))
            ->exists();

        if (!$isProfessor) {
            return response()->json(['error' => 'Instructor must be a professor'], 400);
        }

        // 🔥 CONFLICT DETECTION
        $conflict = CourseOffering::where('semester_id', $validated['semester_id'])
            ->where('course_schedule_day', $validated['course_schedule_day'])
            ->where(function ($q) use ($validated) {
                $q->whereBetween('class_start_time', [
                    $validated['class_start_time'],
                    $validated['class_end_time']
                ])
                ->orWhereBetween('class_end_time', [
                    $validated['class_start_time'],
                    $validated['class_end_time']
                ]);
            })
            ->where(function ($q) use ($validated) {
                $q->where('classroom_location', $validated['classroom_location'])
                  ->orWhere('instructor_id', $validated['instructor_id']);
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'error' => 'Schedule conflict detected (room or instructor busy)'
            ], 409);
        }

        $offering = CourseOffering::create($validated);

        return response()->json($offering, 201);
    }
    // 🔹 SHOW
    public function show($id)
    {
        return CourseOffering::with(['course', 'semester', 'instructor'])
            ->findOrFail($id);
    }

    // 🔹 UPDATE
    public function update(Request $request, $id)
    {
        $offering = CourseOffering::findOrFail($id);

        $offering->update($request->all());

        return response()->json($offering);
    }

    // 🔹 DELETE
    public function destroy($id)
    {
        CourseOffering::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }

    // 🔥 GET PROFESSORS (for dropdown)
    public function professors()
    {
        return User::whereHas('roles', fn($q) => $q->where('role_code', 'professor'))
            ->select('id', 'first_name', 'last_name')
            ->get();
    }

    // 🔥 GET CURRENT SEMESTERS ONLY
    public function currentSemesters()
    {
        return Semester::where('is_active', true)
            ->where('is_current', true)
            ->get();
    }
}