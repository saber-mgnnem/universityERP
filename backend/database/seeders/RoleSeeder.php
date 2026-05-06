<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'role_name' => 'Administrator',
                'role_code' => 'admin',
                'description' => 'System Admin'
            ],
            [
                'role_name' => 'Student',
                'role_code' => 'student',
                'description' => 'Student user'
            ],
            [
                'role_name' => 'Professor',
                'role_code' => 'professor',
                'description' => 'Teaching staff'
            ],
            [
                'role_name' => 'HR Manager',
                'role_code' => 'hr_manager',
                'description' => 'HR department'
            ],
            [
                'role_name' => 'Finance Manager',
                'role_code' => 'finance_manager',
                'description' => 'Finance department'
            ],
            [
                'role_name' => 'Rector',
                'role_code' => 'rector',
                'description' => 'University head'
            ],
            [
                'role_name' => 'Department Head',
                'role_code' => 'department',
                'description' => 'Head of department'
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['role_code' => $role['role_code']],
                $role
            );
        }
    }
}