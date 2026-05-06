<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class JobApplication extends Model
{
    protected $fillable = [
        'job_posting_id',
        'applicant_first_name',
        'applicant_last_name',
        'applicant_email',
        'application_status'
    ];

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }
}