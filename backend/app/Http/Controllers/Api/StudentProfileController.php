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
public function assignDepartment(Request $request, $userId)
{
    $request->validate([
        'department_id' => 'required|exists:departments,id'
    ]);

    // ✅ try to find existing profile
    $studentProfile = StudentProfile::where('user_id', $userId)->first();

    // ✅ if not found → create new profile
    if (!$studentProfile) {
        $studentProfile = StudentProfile::create([
            'user_id' => $userId,
            'department_id' => $request->department_id,

            // required fields in your table → give safe defaults
            'student_id' => 'STU-' . $userId, // or generate properly
            'enrollment_date' => now(),
            'current_semester' => 1,
            'current_gpa' => 0,
            'cumulative_gpa' => 0,
            'academic_standing' => 'Good',
            'total_credits_earned' => 0,
            'is_international_student' => false,
            'is_active' => true,
        ]);
    } else {
        // ✅ update existing
        $studentProfile->department_id = $request->department_id;
        $studentProfile->save();
    }

    return response()->json([
        'message' => 'Department assigned successfully',
        'data' => $studentProfile
    ]);
}
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