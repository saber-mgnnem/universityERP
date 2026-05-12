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
        'contract_document_url',
        'salary_amount',
        'salary_frequency',
        'benefits_description',
        'renewal_date',
        'contract_status',
        'termination_date',
        'termination_reason',
        'created_by',
    ];

    protected $casts = [
        'contract_start_date' => 'date',
        'contract_end_date' => 'date',
        'renewal_date' => 'date',
        'termination_date' => 'date',
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