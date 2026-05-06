<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'student_id',
        'course_offering_id',
        'enrollment_date',
        'enrollment_status',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function courseOffering()
    {
        return $this->belongsTo(CourseOffering::class);
    }

    public function grade()
    {
        return $this->hasOne(CourseGrade::class);
    }
}