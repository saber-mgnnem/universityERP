<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\CourseOffering;

class AttendanceRecord extends Model
{
    protected $fillable = [
        'course_offering_id',
        'student_id',
        'attendance_date',
        'attendance_status',
        'recorded_by'
    ];

    public function courseOffering()
    {
        return $this->belongsTo(CourseOffering::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}