<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'job_title',
        'department_id',
        'posting_date',
        'closing_date',
        'posted_by'
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