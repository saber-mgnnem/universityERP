<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseMaterial extends Model
{
   protected $fillable = [
        'course_offering_id',
        'material_title',
        'material_type',
        'material_description',
        'file_url',
        'external_link_url',
        'uploaded_by',
        'upload_date',
        'is_required_reading',
        'week_number',
        'display_order',
        'is_active',
    ];

    public function courseOffering()
    {
        return $this->belongsTo(CourseOffering::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}