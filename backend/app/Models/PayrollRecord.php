<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollRecord extends Model
{
    protected $fillable = [
        'staff_id',
        'payroll_month',
        'payroll_year',
        'basic_salary',
        'net_salary',
        'payment_status',
        'processed_by'
    ];

    public function staff()
    {
        return $this->belongsTo(StaffProfile::class, 'staff_id');
    }

    public function processor()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }
}