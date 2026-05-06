<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentPayment extends Model
{
    protected $fillable = [
        'student_id',
        'semester_id',
        'payment_type',
        'amount_due',
        'amount_paid',
        'payment_due_date',
        'payment_date',
        'payment_method',
        'transaction_reference',
        'payment_status',
        'late_fee_applied',
        'receipt_number',
        'remarks'
    ];

    public function student()
    {
        return $this->belongsTo(StudentProfile::class, 'student_id');
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}