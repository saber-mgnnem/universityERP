<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicSession extends Model
{
    protected $fillable = [
        'session_name',
        'session_year',
        'session_start_date',
        'session_end_date'
    ];

   public function semesters()
{
    return $this->hasMany(Semester::class, 'session_id');
}
}