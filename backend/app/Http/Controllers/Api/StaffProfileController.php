<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\StaffProfile;

class StaffProfileController extends Controller
{
    // 🔹 GET ALL (admin only ideally)
    public function index()
    {
        return StaffProfile::with(['user', 'department'])->get();
    }

    // 🔹 CREATE (admin / HR only)
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|unique:staff_profiles,user_id',
            'employee_id' => 'required|unique:staff_profiles,employee_id',
            'department_id' => 'required|exists:departments,id',
            'designation_title' => 'required|string',
            'employment_type' => 'required',
            'joining_date' => 'required|date',
        ]);

        $staff = StaffProfile::create($request->all());

return response()->json(
    $staff->load(['user', 'department']),
    201
);
    }

    // 🔹 GET ONE
    public function show($id)
    {
        return StaffProfile::with(['user', 'department'])->findOrFail($id);
    }

    // 🔹 UPDATE (ROLE-BASED SECURITY)
    public function update(Request $request, $id)
    {
        $staff = StaffProfile::findOrFail($id);

        $user = auth()->user();

        // 🔐 If ADMIN or HR → full update
        if ($user->roles()->whereIn('role_code', ['admin', 'hr_manager'])->exists()) {
            $staff->update($request->all());
        } else {
            // 🔐 STAFF can only update limited fields
            if ($staff->user_id !== $user->id) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $staff->update($request->only([
                'office_phone',
                'emergency_contact_name',
                'emergency_contact_phone',
                'emergency_contact_relationship',
            ]));
        }

return response()->json(
    $staff->load(['user', 'department'])
);    }

    // 🔹 DELETE (admin only)
    public function destroy($id)
    {
        $staff = StaffProfile::findOrFail($id);

        $staff->delete();

        return response()->json(['message' => 'Deleted']);
    }
}