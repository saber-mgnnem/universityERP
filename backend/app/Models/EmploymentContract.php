<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmploymentContract extends Model
{
    protected $fillable = [
        'staff_id',
        'contract_start_date',
        'contract_end_date',
        'contract_type',
        'salary_amount',
        'contract_status',
        'created_by'
    ];

    public function staff()
    {
        return $this->belongsTo(StaffProfile::class, 'staff_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}