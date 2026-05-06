<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialProgress extends Model
{
    protected $fillable = [
        'user_id',
        'course_material_id',
        'is_completed'
    ];

    public function material()
    {
        return $this->belongsTo(CourseMaterial::class, 'course_material_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}