<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CourseGrade;
use App\Models\Enrollment;

class CourseGradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enrollments = Enrollment::all();

        foreach ($enrollments as $enrollment) {

            $ca = rand(10, 30);       // continuous assessment
            $mid = rand(10, 30);      // midterm
            $final = rand(20, 40);    // final exam

            $total = $ca + $mid + $final;

            // GPA + Letter Grade
            if ($total >= 90) {
                $grade = 'A';
                $gpa = 4.0;
                $status = 'Pass';
            } elseif ($total >= 80) {
                $grade = 'B';
                $gpa = 3.0;
                $status = 'Pass';
            } elseif ($total >= 70) {
                $grade = 'C';
                $gpa = 2.0;
                $status = 'Pass';
            } elseif ($total >= 60) {
                $grade = 'D';
                $gpa = 1.0;
                $status = 'Pass';
            } else {
                $grade = 'F';
                $gpa = 0.0;
                $status = 'Fail';
            }

            CourseGrade::create([
                'enrollment_id' => $enrollment->id,

                'continuous_assessment_marks' => $ca,
                'midterm_exam_marks' => $mid,
                'final_exam_marks' => $final,

                'total_marks_obtained' => $total,

                'gpa_points' => $gpa,

                'letter_grade' => $grade,

                'grade_status' => $status,

                'remarks' => $status === 'Pass'
                    ? 'Good performance'
                    : 'Needs improvement',

                'graded_by' => 1,

                'graded_at' => now(),

                'is_final' => true,
            ]);
        }
    }
}