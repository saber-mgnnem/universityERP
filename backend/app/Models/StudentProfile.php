<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
   protected $fillable = [
    'user_id',
    'student_id',
    'department_id',
    'enrollment_date',
    'current_semester',
    'current_gpa',
    'cumulative_gpa',
    'academic_standing',
    'total_credits_earned',
    'father_name',
    'father_phone',
    'mother_name',
    'mother_phone',
    'guardian_name',
    'guardian_contact',
    'registration_number',
    'is_international_student',
    'passport_number',
    'visa_expiry_date',
    'is_active'
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}