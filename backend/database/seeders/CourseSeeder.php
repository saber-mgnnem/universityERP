<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Department;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $cs = Department::where('department_code', 'CS')->first();
        $ba = Department::where('department_code', 'BA')->first();

        Course::create([
            'course_code' => 'CS101',
            'course_title' => 'Introduction to Programming',
            'course_description' => 'Basic programming concepts',
            'department_id' => $cs->id,
            'credit_hours' => 3,
            'total_marks' => 100,
            'passing_marks' => 40,
            'course_level' => '100',
            'max_enrollment' => 50,
            'is_compulsory' => true,
            'is_active' => true,
        ]);

        Course::create([
            'course_code' => 'BA101',
            'course_title' => 'Introduction to Business',
            'course_description' => 'Business fundamentals',
            'department_id' => $ba->id,
            'credit_hours' => 3,
            'total_marks' => 100,
            'passing_marks' => 40,
            'course_level' => '100',
            'max_enrollment' => 60,
            'is_compulsory' => true,
            'is_active' => true,
        ]);
    }
}