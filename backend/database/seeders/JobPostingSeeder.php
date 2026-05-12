<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPosting;
use App\Models\Department;
use App\Models\User;

class JobPostingSeeder extends Seeder
{
    public function run(): void
    {
        $department = Department::first();
        $user = User::first();

        if (!$department || !$user) {
            $this->command->warn('Missing departments or users.');
            return;
        }

        $jobs = [
            [
                'job_title' => 'Assistant Professor - Computer Science',
                'job_description' => 'Teach undergraduate CS courses.',
                'job_category' => 'Faculty',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'Research Associate',
                'job_description' => 'Assist in research projects.',
                'job_category' => 'Research',
                'employment_type' => 'Contract',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'Lab Technician',
                'job_description' => 'Manage lab equipment.',
                'job_category' => 'Support',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Closed',
            ],
            [
                'job_title' => 'Senior Professor - Physics',
                'job_description' => 'Advanced physics teaching.',
                'job_category' => 'Faculty',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'On Hold',
            ],
            [
                'job_title' => 'Administrative Officer',
                'job_description' => 'Handle admin tasks.',
                'job_category' => 'Administrative',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'IT Support Specialist',
                'job_description' => 'Support IT systems.',
                'job_category' => 'Support',
                'employment_type' => 'Contract',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'Data Analyst',
                'job_description' => 'Analyze university data.',
                'job_category' => 'Research',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'HR Assistant',
                'job_description' => 'Assist HR department.',
                'job_category' => 'Administrative',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'Physics Lecturer',
                'job_description' => 'Teach physics courses.',
                'job_category' => 'Faculty',
                'employment_type' => 'Part-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
            [
                'job_title' => 'Network Engineer',
                'job_description' => 'Maintain network systems.',
                'job_category' => 'Support',
                'employment_type' => 'Full-time',
                'posting_date' => now(),
                'closing_date' => now()->addMonth(),
                'position_status' => 'Open',
            ],
        ];

        foreach ($jobs as $job) {
            JobPosting::create([
                ...$job,
                'department_id' => $department->id,
                'posted_by' => $user->id,
                'number_of_positions' => rand(1, 3),
                'is_active' => true,
            ]);
        }
    }
}