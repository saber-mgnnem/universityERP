<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\JobPosting;

class JobPostingController extends Controller
{
    // ================= PUBLIC JOBS =================
    public function publicJobs()
    {
        return JobPosting::with('department')
            ->where('is_active', true)
            ->where('position_status', 'Open')
            ->latest()
            ->get();
    }

    // ================= GET ALL =================
    public function index()
    {
        return JobPosting::with([
            'department',
            'poster',
            'applications'
        ])->latest()->get();
    }

    // ================= CREATE =================
public function store(Request $request)
{
    $validated = $request->validate([
        'job_title' => 'required|string',
        'job_description' => 'required|string',
        'job_category' => 'required|string',
        'department_id' => 'required|exists:departments,id',
        'employment_type' => 'required|string',
        'posting_date' => 'required|date',
        'closing_date' => 'required|date',

        // optional fields
        'qualification_requirements' => 'nullable|string',
        'experience_required' => 'nullable|integer',
        'salary_range_min' => 'nullable|numeric',
        'salary_range_max' => 'nullable|numeric',
        'number_of_positions' => 'nullable|integer',
        'position_status' => 'nullable|string',
    ]);

    $job = JobPosting::create([
        ...$validated,
        'position_status' => $request->position_status ?? 'Open',
        'posted_by' => auth()->id(),
    ]);

    return response()->json($job, 201);
}

    // ================= SHOW =================
    public function show(string $id)
    {
        return JobPosting::with([
            'department',
            'applications'
        ])->findOrFail($id);
    }

    // ================= UPDATE =================
 public function update(Request $request, string $id)
{
    $job = JobPosting::findOrFail($id);

    $validated = $request->validate([
        'job_title' => 'sometimes|string',
        'job_description' => 'sometimes|string',
        'job_category' => 'sometimes|string',
        'department_id' => 'sometimes|exists:departments,id',
        'employment_type' => 'sometimes|string',
        'posting_date' => 'sometimes|date',
        'closing_date' => 'sometimes|date',
        'position_status' => 'sometimes|string',
    ]);

    $job->update($validated);

    return response()->json($job);
}

    // ================= DELETE =================
    public function destroy(string $id)
    {
        $job = JobPosting::findOrFail($id);

        $job->delete();

        return response()->json([
            'message' => 'Job deleted'
        ]);
    }
}