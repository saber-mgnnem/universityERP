<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseGrade extends Model
{
    protected $fillable = [
        'enrollment_id',
        'continuous_assessment_marks',
        'midterm_exam_marks',
        'final_exam_marks',
        'total_marks_obtained',
        'gpa_points',
        'letter_grade',
        'grade_status',
        'graded_by'
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function grader()
    {
        return $this->belongsTo(User::class, 'graded_by');
    }
}