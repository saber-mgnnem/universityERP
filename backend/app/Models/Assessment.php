<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'course_offering_id',
        'assessment_title',
        'assessment_type',
        'total_marks',
        'created_by'
    ];

    public function courseOffering()
    {
        return $this->belongsTo(CourseOffering::class);
    }

    public function submissions()
    {
        return $this->hasMany(AssessmentSubmission::class);
    }
}
