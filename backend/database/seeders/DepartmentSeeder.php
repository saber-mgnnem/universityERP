<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\User;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        // Optional: assign a head (admin if exists)
        $admin = User::whereHas('roles', function ($q) {
            $q->where('role_code', 'admin');
        })->first();

        $departments = [
            [
                'department_name' => 'Computer Science',
                'department_code' => 'CS',
                'description' => 'Department of Computer Science',
                'office_building' => 'Block A',
                'contact_email' => 'cs@university.com',
            ],
            [
                'department_name' => 'Business Administration',
                'department_code' => 'BA',
                'description' => 'Business and Management Studies',
                'office_building' => 'Block B',
                'contact_email' => 'ba@university.com',
            ],
            [
                'department_name' => 'Electrical Engineering',
                'department_code' => 'EE',
                'description' => 'Electrical and Electronics Engineering',
                'office_building' => 'Block C',
                'contact_email' => 'ee@university.com',
            ],
            [
                'department_name' => 'Mechanical Engineering',
                'department_code' => 'ME',
                'description' => 'Mechanical Systems and Design',
                'office_building' => 'Block D',
                'contact_email' => 'me@university.com',
            ],
            [
                'department_name' => 'Mathematics',
                'department_code' => 'MATH',
                'description' => 'Pure and Applied Mathematics',
                'office_building' => 'Block E',
                'contact_email' => 'math@university.com',
            ],
        ];

        foreach ($departments as $dept) {

            Department::updateOrCreate(
                ['department_code' => $dept['department_code']],
                [
                    'department_name' => $dept['department_name'],
                    'description' => $dept['description'],
                    'head_of_department_id' => $admin?->id,
                    'faculty_count' => rand(5, 30),
                    'student_count' => rand(50, 300),
                    'budget_allocation' => rand(50000, 200000),
                    'contact_email' => $dept['contact_email'],
                    'contact_phone' => '12345678',
                    'office_building' => $dept['office_building'],
                    'office_room_number' => rand(100, 500),
                    'is_active' => true,
                ]
            );
        }
    }
}