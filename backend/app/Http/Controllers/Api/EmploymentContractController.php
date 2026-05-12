<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EmploymentContract;

class EmploymentContractController extends Controller
{
    // ================= GET ALL =================
    public function index()
    {
        return EmploymentContract::with([
            'staff.user',
            'staff.department',
            'creator'
        ])->latest()->get();
    }

    // ================= CREATE =================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => 'required|exists:staff_profiles,id',
            'contract_start_date' => 'required|date',
            'contract_end_date' => 'nullable|date',
            'contract_type' => 'required',
            'salary_amount' => 'required|numeric',
            'salary_frequency' => 'required',
            'benefits_description' => 'nullable|string',
            'contract_status' => 'required',
        ]);

        $validated['created_by'] = auth()->id();

        $contract = EmploymentContract::create($validated);

        return response()->json(
            $contract->load([
                'staff.user',
                'staff.department',
                'creator'
            ]),
            201
        );
    }

    // ================= SHOW =================
    public function show(string $id)
    {
        return EmploymentContract::with([
            'staff.user',
            'staff.department',
            'creator'
        ])->findOrFail($id);
    }

    // ================= UPDATE =================
    public function update(Request $request, string $id)
    {
        $contract = EmploymentContract::findOrFail($id);

        $contract->update($request->all());

        return response()->json(
            $contract->load([
                'staff.user',
                'staff.department',
                'creator'
            ])
        );
    }

    // ================= DELETE =================
    public function destroy(string $id)
    {
        $contract = EmploymentContract::findOrFail($id);

        $contract->delete();

        return response()->json([
            'message' => 'Contract deleted successfully'
        ]);
    }
}