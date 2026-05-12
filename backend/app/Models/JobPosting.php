<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
   protected $fillable = [
        'job_title',
        'job_description',
        'job_category',
        'department_id',
        'qualification_requirements',
        'experience_required',
        'salary_range_min',
        'salary_range_max',
        'employment_type',
        'posting_date',
        'closing_date',
        'position_status',
        'posted_by',
        'number_of_positions',
        'is_active',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function poster()
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}