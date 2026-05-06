<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseOffering extends Model
{
   protected $fillable = [
        'course_id',
        'semester_id',
        'section_number',
        'instructor_id',
        'capacity',
        'enrolled_students',
        'classroom_location',
        'course_schedule_day',
        'class_start_time',
        'class_end_time',
        'office_hours',
        'course_syllabus_url',
        'is_active'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}