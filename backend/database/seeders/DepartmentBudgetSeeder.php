<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DepartmentBudget;
use App\Models\Department;
use App\Models\AcademicSession;
use App\Models\User;

class DepartmentBudgetSeeder extends Seeder
{
    public function run(): void
    {
        $departments = Department::all();
        $session = AcademicSession::first();
        $rector = User::whereHas('roles', function ($q) {
            $q->where('role_code', 'rector');
        })->first();

        foreach ($departments->take(10) as $index => $dept) {

            $total = rand(100000, 500000);
            $spent = rand(50000, (int)($total * 0.9));
            $remaining = $total - $spent;

            DepartmentBudget::create([
                'department_id' => $dept->id,
                'academic_session_id' => $session?->id,

                'total_budget' => $total,

                'salaries_budget' => $total * 0.40,
                'equipment_budget' => $total * 0.20,
                'research_budget' => $total * 0.15,
                'maintenance_budget' => $total * 0.15,
                'other_expenses_budget' => $total * 0.10,

                'allocated_amount' => $total,
                'spent_amount' => $spent,
                'remaining_amount' => $remaining,

                'budget_status' => ['Pending', 'Approved', 'Rejected'][rand(0, 2)],

                'approved_by' => $rector?->id,
                'approval_date' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
            ]);
        }
    }
}