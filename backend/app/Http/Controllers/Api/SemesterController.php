<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Semester;

class SemesterController extends Controller
{
    public function index()
    {
        return Semester::with('session')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|exists:academic_sessions,id',
            'semester_name' => 'required|string',
            'semester_number' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'registration_start_date' => 'nullable|date',
            'registration_end_date' => 'nullable|date',
            'is_current' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $semester = Semester::create($validated);

        return response()->json($semester, 201);
    }

    public function show($id)
    {
        return Semester::with('session')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $semester = Semester::findOrFail($id);
        $semester->update($request->all());

        return response()->json($semester);
    }

    public function destroy($id)
    {
        $semester = Semester::findOrFail($id);
        $semester->delete();

        return response()->json(['message' => 'Deleted']);
    }
}