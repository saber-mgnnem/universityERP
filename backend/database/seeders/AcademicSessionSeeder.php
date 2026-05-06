<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicSession;

class AcademicSessionSeeder extends Seeder
{
    public function run(): void
    {
        AcademicSession::create([
            'session_name' => '2025-2026',
            'session_year' => 2025,
            'session_start_date' => '2025-09-01',
            'session_end_date' => '2026-06-30',
            'semester_count' => 2,
            'is_current_session' => true,
            'is_active' => true,
        ]);

        AcademicSession::create([
            'session_name' => '2024-2025',
            'session_year' => 2024,
            'session_start_date' => '2024-09-01',
            'session_end_date' => '2025-06-30',
            'semester_count' => 2,
            'is_current_session' => false,
            'is_active' => true,
        ]);
    }
}