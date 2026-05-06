<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // 🔹 GET ALL
    public function index()
    {
        return Department::with('head')->get();
    }

    // 🔹 CREATE
    public function store(Request $request)
    {
        $request->validate([
            'department_name' => 'required|string|max:255',
            'department_code' => 'required|unique:departments,department_code',
            'budget_allocation' => 'nullable|numeric',
        ]);

        $department = Department::create($request->all());

        return response()->json($department, 201);
    }

    // 🔹 GET ONE
    public function show($id)
    {
        return Department::with('head')->findOrFail($id);
    }

    // 🔹 UPDATE
    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);

        $department->update($request->all());

        return response()->json($department);
    }

    // 🔹 DELETE
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Deleted']);
    }
}