<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\JobApplication;

class JobApplicationController extends Controller
{
    // ================= GET ALL =================
    public function index()
    {
        return JobApplication::with([
            'jobPosting.department'
        ])->latest()->get();
    }

    // ================= CREATE APPLICATION =================
    public function store(Request $request)
    {
        $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',

            'applicant_first_name' => 'required|string',

            'applicant_last_name' => 'required|string',

            'applicant_email' => 'required|email',

            'applicant_phone' => 'required|string',

            'resume_url' => 'required|string',
        ]);

        $application = JobApplication::create([
            ...$request->all(),
            'application_date' => now(),
            'application_status' => 'Submitted',
        ]);

        return response()->json(
            $application,
            201
        );
    }

    // ================= SHOW =================
    public function show(string $id)
    {
        return JobApplication::with([
            'jobPosting.department'
        ])->findOrFail($id);
    }

    // ================= UPDATE =================
    public function update(
        Request $request,
        string $id
    ) {

        $application =
            JobApplication::findOrFail($id);

        $application->update(
            $request->all()
        );

        return response()->json(
            $application
        );
    }

    // ================= UPDATE STATUS =================
    public function updateStatus(
        Request $request,
        string $id
    ) {

        $request->validate([
            'application_status' => 'required',
        ]);

        $application =
            JobApplication::findOrFail($id);

        $application->update([
            'application_status' =>
                $request->application_status,

            'selected_by' =>
                auth()->id(),

            'selection_date' =>
                now(),

            'rejection_reason' =>
                $request->rejection_reason,
        ]);

        return response()->json(
            $application
        );
    }

    // ================= DELETE =================
    public function destroy(string $id)
    {
        $application =
            JobApplication::findOrFail($id);

        $application->delete();

        return response()->json([
            'message' =>
                'Application deleted'
        ]);
    }
}