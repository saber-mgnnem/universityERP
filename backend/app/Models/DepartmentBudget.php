<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Department;
use App\Models\AcademicSession;
use App\Models\User;

class DepartmentBudget extends Model
{
protected $fillable = [
    'department_id',
    'academic_session_id',
    'total_budget',

    'salaries_budget',
    'equipment_budget',
    'research_budget',
    'maintenance_budget',
    'other_expenses_budget',

    'allocated_amount',
    'spent_amount',
    'remaining_amount',

    'budget_status',
    'approved_by',
];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

 public function academicSession()
{
    return $this->belongsTo(AcademicSession::class, 'academic_session_id');
}

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}