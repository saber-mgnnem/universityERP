<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
  protected $fillable = [
    'department_name',
    'department_code',
    'description',
    'head_of_department_id',
    'faculty_count',
    'student_count',
    'budget_allocation',
    'contact_email',
    'contact_phone',
    'office_building',
    'office_room_number',
    'is_active',
];

    public function head()
    {
        return $this->belongsTo(User::class, 'head_of_department_id');
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function students()
    {
        return $this->hasMany(StudentProfile::class);
    }

    public function staff()
    {
        return $this->hasMany(StaffProfile::class);
    }
}