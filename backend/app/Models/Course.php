<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Course extends Model
{
     protected $fillable = [
        'course_code',
        'course_title',
        'course_description',
        'department_id',
        'credit_hours',
        'total_marks',
        'passing_marks',
        'course_level',
        'prerequisites_text',
        'max_enrollment',
        'is_compulsory',
        'is_elective',
        'is_active'
    ];

    protected $casts = [
        'is_compulsory' => 'boolean',
        'is_elective' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function offerings()
    {
        return $this->hasMany(CourseOffering::class);
    }
}