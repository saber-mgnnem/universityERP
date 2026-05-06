<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        $adminRole = Role::where('role_code', 'admin')->first();
        $admin->roles()->attach($adminRole->id, [
            'assigned_at' => now(),
            'is_primary' => true
        ]);

        // Create Student
        $student = User::create([
            'first_name' => 'Student',
            'last_name' => 'User',
            'email' => 'student@test.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        $studentRole = Role::where('role_code', 'student')->first();
        $student->roles()->attach($studentRole->id, [
            'assigned_at' => now(),
            'is_primary' => true
        ]);

        // Create Professor
        $professor = User::create([
            'first_name' => 'Professor',
            'last_name' => 'User',
            'email' => 'prof@test.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        $profRole = Role::where('role_code', 'professor')->first();
        $professor->roles()->attach($profRole->id, [
            'assigned_at' => now(),
            'is_primary' => true
        ]);

        // Create HR
        $hr = User::create([
            'first_name' => 'HR',
            'last_name' => 'Manager',
            'email' => 'hr@test.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        $hrRole = Role::where('role_code', 'hr_manager')->first();
        $hr->roles()->attach($hrRole->id, [
            'assigned_at' => now(),
            'is_primary' => true
        ]);
    }
}