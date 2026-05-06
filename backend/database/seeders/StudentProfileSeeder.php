<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\StudentProfile;
use App\Models\Department;

class StudentProfileSeeder extends Seeder
{
    public function run(): void
    {
        $department = Department::first(); // make sure departments exist

        if (!$department) {
            $this->command->warn('No departments found. Seed departments first.');
            return;
        }

        // Get users with student role
        $students = User::whereHas('roles', function ($q) {
            $q->where('role_code', 'student');
        })->get();

        foreach ($students as $index => $user) {

            StudentProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'student_id' => 'STU' . str_pad($user->id, 4, '0', STR_PAD_LEFT),
                    'department_id' => $department->id,
                    'enrollment_date' => now()->subYears(rand(1, 4)),
                    'current_semester' => rand(1, 8),
                    'current_gpa' => rand(20, 40) / 10,
                    'cumulative_gpa' => rand(20, 40) / 10,
                    'academic_standing' => 'Good',
                    'total_credits_earned' => rand(20, 120),

                    'father_name' => 'Father ' . $user->first_name,
                    'father_phone' => '12345678',

                    'mother_name' => 'Mother ' . $user->first_name,
                    'mother_phone' => '87654321',

                    'guardian_name' => 'Guardian ' . $user->first_name,
                    'guardian_contact' => '99999999',

                    'registration_number' => 'REG' . rand(1000, 9999),

                    'is_international_student' => false,
                    'is_active' => true,
                ]
            );
        }
    }
}