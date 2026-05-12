<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $fillable = [
        'staff_id',
        'leave_type',
        'start_date',
        'end_date',
        'number_of_days',
        'leave_reason',
        'approval_status',
        'approved_by',
        'approval_date',
        'rejection_reason',
    ];

    public function staff()
    {
        return $this->belongsTo(StaffProfile::class, 'staff_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}