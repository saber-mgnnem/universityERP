<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssessmentGrade extends Model
{
    protected $fillable = [
        'assessment_submission_id',
        'marks_obtained',
        'graded_by'
    ];

    public function submission()
    {
        return $this->belongsTo(AssessmentSubmission::class, 'assessment_submission_id');
    }
}