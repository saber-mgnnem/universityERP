<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssessmentSubmission extends Model
{
    protected $fillable = [
        'assessment_id',
        'student_id',
        'submission_text'
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function grade()
    {
        return $this->hasOne(AssessmentGrade::class);
    }
}