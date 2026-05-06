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
    $request->validate([
        'course_offering_id' => 'required|exists:course_offerings,id',
        'material_title' => 'required|string',
        'material_type' => 'required|in:Lecture Notes,Video,Article,Book,Code,Other',
        'material_description' => 'nullable|string',
        'week_number' => 'nullable|integer',
        'file' => 'nullable|file|max:20480',
        'external_link_url' => 'nullable|url',
    ]);

    if (!$request->hasFile('file') && !$request->external_link_url) {
        return response()->json([
            'message' => 'File or external link is required'
        ], 422);
    }

    $filePath = null;

    // ✅ STORE FILE
    if ($request->hasFile('file')) {
        $filePath = $request->file('file')->store('materials', 'public');
    }

    $material = CourseMaterial::create([
        'course_offering_id' => $request->course_offering_id,
        'material_title' => $request->material_title,
        'material_type' => $request->material_type,
        'material_description' => $request->material_description,

        // 🔥 FIXED HERE
       'file_url' => $filePath,

        'external_link_url' => $request->external_link_url,
        'uploaded_by' => auth()->id(),
        'upload_date' => now(),
        'week_number' => $request->week_number,
        'is_active' => true,
    ]);

    return response()->json($material, 201);
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