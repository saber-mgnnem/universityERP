<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $fillable = [
        'session_id',
        'semester_name',
        'semester_number',
        'start_date',
        'end_date'
    ];

    public function session()
{
    return $this->belongsTo(AcademicSession::class, 'session_id');
}

    public function courseOfferings()
    {
        return $this->hasMany(CourseOffering::class);
    }
}