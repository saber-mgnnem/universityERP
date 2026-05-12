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
    'allowances_total',
    'deductions_total',
    'gross_salary',
    'income_tax',
    'provident_fund',
    'professional_tax',
    'health_insurance_deduction',
    'other_deductions',
    'net_salary',
    'payment_status',
    'payment_date',
    'payment_method',
    'transaction_reference',
    'processed_by',
    'processed_at',
    'remarks'
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