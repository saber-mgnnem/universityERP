<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffProfile extends Model
{
    protected $fillable = [
        'user_id',
        'employee_id',
        'department_id',

        'designation_title',
        'employment_type',
        'joining_date',

        'qualification',
        'specialization',

        'office_location',
        'office_phone',

        'salary_grade',

        'bank_account_number',
        'bank_name',
        'ifsc_code',

        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relationship',

        'employment_status_date',

        'is_active',
    ];

    protected $casts = [
        'joining_date' => 'date',
        'employment_status_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function contracts()
    {
        return $this->hasMany(EmploymentContract::class, 'staff_id');
    }
}