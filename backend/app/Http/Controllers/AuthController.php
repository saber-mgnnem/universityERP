<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // VALIDATION
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|min:6',
        ]);

        // CREATE USER
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'is_active'  => true,
        ]);

        // GET ROLE
        $role = Role::where('role_code', 'student')->first();

        if (!$role) {
            return response()->json([
                'error' => 'Default role (student) not found. Run RoleSeeder first.'
            ], 500);
        }

        // ATTACH ROLE
        $user->roles()->attach($role->id, [
            'assigned_at' => now(),
            'assigned_by' => null,
            'is_primary' => true
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'token' => $token
        ]);
    }

    public function me()
    {
        return response()->json(
            auth()->user()->load('roles')
        );
    }
}