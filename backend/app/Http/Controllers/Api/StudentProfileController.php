<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\StudentProfile;

class StudentProfileController extends Controller
{
    // 🔹 GET ALL
    public function index()
    {
        return StudentProfile::with(['user', 'department'])->get();
    }
    // 🔹 GET myprofile

    public function myProfile()
    {
        $user = auth()->user();

        $profile = $user->studentProfile;

        if (!$profile) {
            return response()->json([
                'error' => 'Profile not found'
            ], 404);
        }

        return response()->json(
            $profile->load(['user', 'department'])
        );
    }
    // 🔹 CREATE
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|unique:student_profiles,user_id',
            'student_id' => 'required|unique:student_profiles,student_id',
            'department_id' => 'required|exists:departments,id',
            'enrollment_date' => 'required|date',
        ]);

        $student = StudentProfile::create($request->all());

        return response()->json($student, 201);
    }

    // 🔹 GET ONE
    public function show($id)
    {
        return StudentProfile::with(['user', 'department'])->findOrFail($id);
    }

    // 🔹 UPDATE
public function updateMyProfile(Request $request)
{
    $user = auth()->user();

    $profile = $user->studentProfile;

    if (!$profile) {
        return response()->json(['error' => 'Profile not found'], 404);
    }

    // ONLY SAFE FIELDS
    $profile->update($request->only([
        'father_name',
        'father_phone',
        'mother_name',
        'mother_phone',
        'guardian_name',
        'guardian_contact'
    ]));

    return response()->json([
        'message' => 'Profile updated',
        'profile' => $profile
    ]);
}

public function update(Request $request, $id)
{
    $student = StudentProfile::findOrFail($id);

    // Only allow admin-safe fields
    $student->update($request->only([
        'department_id',
        'current_semester',
        'current_gpa',
        'cumulative_gpa',
        'academic_standing',
        'total_credits_earned',
        'is_active'
    ]));

    return response()->json($student);
}
    // 🔹 DELETE
    public function destroy($id)
    {
        $student = StudentProfile::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Deleted']);
    }
}