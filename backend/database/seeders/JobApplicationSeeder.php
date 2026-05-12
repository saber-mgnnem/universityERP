<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobApplication;
use App\Models\JobPosting;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = JobPosting::all();

        if ($jobs->isEmpty()) {
            $this->command->warn('No job postings found.');
            return;
        }

        $statuses = [
            'Submitted',
            'Under Review',
            'Shortlisted',
            'Interview',
            'Offered',
            'Rejected',
            'Accepted',
        ];

        for ($i = 1; $i <= 10; $i++) {

            $job = $jobs->random();

            JobApplication::create([
                'job_posting_id' => $job->id,
                'applicant_first_name' => "Candidate$i",
                'applicant_last_name' => "Test",
                'applicant_email' => "candidate$i@example.com",
                'applicant_phone' => "12345678$i",
                'applicant_address' => "City $i",
                'resume_url' => "resume$i.pdf",
                'cover_letter_url' => null,
                'years_of_experience' => rand(1, 10),
                'highest_qualification' => 'Masters',
                'application_date' => now()->subDays(rand(1, 30)),
                'application_status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}