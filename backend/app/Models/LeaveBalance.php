<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveBalance extends Model
{
    protected $fillable = [
        'staff_id',
        'leave_year',
        'leave_type',
        'total_days_allocated',
        'used_days',
        'remaining_days'
    ];

    public function staff()
    {
        return $this->belongsTo(StaffProfile::class, 'staff_id');
    }
}