<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\StaffProfile;
use App\Models\Department;

class StaffProfileSeeder extends Seeder
{
    public function run(): void
    {
        $department = Department::first();

        if (!$department) {
            $this->command->warn('No departments found. Seed departments first.');
            return;
        }

        // ================= GET STAFF USERS =================
        $staffUsers = User::whereHas('roles', function ($q) {
            $q->whereIn('role_code', ['professor', 'hr_manager']);
        })->take(5)->get();

        // ================= FALLBACK =================
        if ($staffUsers->count() < 5) {

            // create additional users if less than 5 exist
            $missing = 5 - $staffUsers->count();

            for ($i = 1; $i <= $missing; $i++) {

                $user = User::create([
                    'first_name' => 'Professor',
                    'last_name' => $i,
                    'email' => 'professor' . $i . '@university.com',
                    'password' => bcrypt('password'),
                    'is_active' => true,
                ]);

                $staffUsers->push($user);
            }
        }

        // ================= SAMPLE DATA =================
        $profiles = [
            [
                'designation_title' => 'Professor',
                'specialization' => 'Computer Science',
                'qualification' => 'PhD in AI',
                'office_location' => 'Block A - 201',
                'salary_grade' => 'A1',
            ],
            [
                'designation_title' => 'Associate Professor',
                'specialization' => 'Cyber Security',
                'qualification' => 'PhD in Security',
                'office_location' => 'Block B - 102',
                'salary_grade' => 'A2',
            ],
            [
                'designation_title' => 'Lecturer',
                'specialization' => 'Software Engineering',
                'qualification' => 'Masters in SE',
                'office_location' => 'Block C - 305',
                'salary_grade' => 'B1',
            ],
            [
                'designation_title' => 'HR Manager',
                'specialization' => 'Human Resources',
                'qualification' => 'MBA HR',
                'office_location' => 'Admin Block',
                'salary_grade' => 'A3',
            ],
            [
                'designation_title' => 'Assistant Professor',
                'specialization' => 'Data Science',
                'qualification' => 'PhD in Data Science',
                'office_location' => 'Block D - 410',
                'salary_grade' => 'B2',
            ],
        ];

        // ================= CREATE STAFF PROFILES =================
        foreach ($staffUsers as $index => $user) {

            $profile = $profiles[$index] ?? $profiles[0];

            StaffProfile::updateOrCreate(
                ['user_id' => $user->id],
                [

                    'employee_id' =>
                        'EMP' . str_pad($user->id, 4, '0', STR_PAD_LEFT),

                    'department_id' => $department->id,

                    'designation_title' =>
                        $profile['designation_title'],

                    'employment_type' => 'Full-time',

                    'joining_date' =>
                        now()->subYears(rand(1, 10)),

                    'qualification' =>
                        $profile['qualification'],

                    'specialization' =>
                        $profile['specialization'],

                    'office_location' =>
                        $profile['office_location'],

                    'office_phone' =>
                        '1111' . rand(1000, 9999),

                    'salary_grade' =>
                        $profile['salary_grade'],

                    'bank_account_number' =>
                        rand(100000000, 999999999),

                    'bank_name' =>
                        'National Bank',

                    'ifsc_code' =>
                        'BANK00' . rand(100, 999),

                    'emergency_contact_name' =>
                        'Emergency Contact',

                    'emergency_contact_phone' =>
                        '2222' . rand(1000, 9999),

                    'emergency_contact_relationship' =>
                        'Spouse',

                    'employment_status_date' =>
                        now(),

                    'is_active' => true,
                ]
            );
        }

        $this->command->info('5 Staff Profiles Seeded Successfully.');
    }
}