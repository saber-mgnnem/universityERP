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
    'applicant_phone',
    'applicant_address',
    'resume_url',
    'cover_letter_url',
    'years_of_experience',
    'highest_qualification',
    'application_date',
    'application_status',
    'interview_date',
    'interview_location',
    'interview_notes',
    'selected_by',
    'selection_date',
    'rejection_reason',
];

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }
}