<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Semester;
use App\Models\AcademicSession;

class SemesterSeeder extends Seeder
{
    public function run(): void
    {
        $session = AcademicSession::where('is_current_session', true)->first();

        if (!$session) {
            echo "No academic session found. Run AcademicSessionSeeder first.\n";
            return;
        }

        // Fall Semester
        Semester::create([
            'session_id' => $session->id,
            'semester_name' => 'Fall',
            'semester_number' => 1,
            'start_date' => '2025-09-01',
            'end_date' => '2026-01-15',
            'registration_start_date' => '2025-08-01',
            'registration_end_date' => '2025-08-31',
            'is_current' => true,
            'is_active' => true,
        ]);

        // Spring Semester
        Semester::create([
            'session_id' => $session->id,
            'semester_name' => 'Spring',
            'semester_number' => 2,
            'start_date' => '2026-02-01',
            'end_date' => '2026-06-30',
            'registration_start_date' => '2026-01-01',
            'registration_end_date' => '2026-01-31',
            'is_current' => false,
            'is_active' => true,
        ]);
    }
}