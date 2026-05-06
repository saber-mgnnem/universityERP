<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 🔹 GET ALL USERS (ADMIN ONLY)
    public function index()
    {
        return User::with('roles')->get();
    }

    // 🔹 CREATE USER (ADMIN ONLY - STAFF, HR, etc.)
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|min:6',
            'role_code'  => 'required|exists:roles,role_code'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'is_active'  => true,
        ]);

        $role = Role::where('role_code', $request->role_code)->first();

        $user->roles()->attach($role->id, [
            'assigned_at' => now(),
            'is_primary' => true
        ]);

        return response()->json($user->load('roles'), 201);
    }

    // 🔹 SHOW ONE USER
    public function show($id)
    {
        return User::with('roles')->findOrFail($id);
    }

    // 🔹 UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->only([
            'first_name',
            'last_name',
            'email',
            'is_active'
        ]));

        return response()->json($user->load('roles'));
    }

    // 🔹 DELETE USER
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json(['message' => 'User deleted']);
    }
}