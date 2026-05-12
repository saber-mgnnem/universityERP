<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffAttendanceRecord extends Model
{
    protected $fillable = [
        'user_id',
        'attendance_date',
        'attendance_status',
        'check_in_time',
        'check_out_time',
        'minutes_late',
        'is_late',
        'auto_marked_absent',
        'remarks',
        'recorded_by',
    ];

    public function staff()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}