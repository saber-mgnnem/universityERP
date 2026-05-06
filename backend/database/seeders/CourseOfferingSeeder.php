<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CourseOffering;
use App\Models\Course;
use App\Models\User;

class CourseOfferingSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::first();
        $instructor = User::first(); // later filter by role = professor

        CourseOffering::create([
            'course_id' => $course->id,
            'semester_id' => 1,
            'section_number' => 'A',
            'instructor_id' => $instructor->id,
            'capacity' => 40,
            'enrolled_students' => 0,
            'classroom_location' => 'Room 101',
            'course_schedule_day' => 'Monday',
            'class_start_time' => '09:00:00',
            'class_end_time' => '11:00:00',
            'office_hours' => 'Wednesday 2-4 PM',
            'is_active' => true,
        ]);
    }
}