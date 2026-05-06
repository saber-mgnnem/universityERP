<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class AuditLog extends Model
{
    protected $fillable = [
        'user_id',
        'action_type',
        'module_name',
        'table_name',
        'record_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
