<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DepartmentBudget;
class DepartmentBudgetController extends Controller
{
    // 🔹 GET ALL BUDGETS
    public function index()
    {
        return DepartmentBudget::with(['department', 'academicSession'])->get();
    }

    // 🔹 STORE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'academic_session_id' => 'required|exists:academic_sessions,id',
            'total_budget' => 'required|numeric',
        ]);

        $budget = DepartmentBudget::create($validated);

        return response()->json($budget, 201);
    }

    public function show(string $id)
    {
        return DepartmentBudget::with(['department', 'academicSession'])->findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $budget = DepartmentBudget::findOrFail($id);
        $budget->update($request->all());

        return response()->json($budget);
    }

    public function destroy(string $id)
    {
        $budget = DepartmentBudget::findOrFail($id);
        $budget->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}