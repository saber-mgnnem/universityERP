<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LeaveRequest;

class LeaveRequestController extends Controller
{
    /**
     * GET ALL LEAVE REQUESTS
     */
    public function index()
    {
        return LeaveRequest::with([
            'staff.user',
            'staff.department',
            'approver'
        ])->latest()->get();
    }

    /**
     * CREATE LEAVE REQUEST
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => 'required|exists:staff_profiles,id',
            'leave_type' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'number_of_days' => 'required|integer',
            'leave_reason' => 'required|string',
        ]);

        $leave = LeaveRequest::create([
            ...$validated,
            'approval_status' => 'Pending',
        ]);

        return response()->json($leave, 201);
    }

    /**
     * GET ONE REQUEST
     */
    public function show(string $id)
    {
        return LeaveRequest::with([
            'staff.user',
            'staff.department',
            'approver'
        ])->findOrFail($id);
    }

    /**
     * UPDATE FULL REQUEST
     */
    public function update(Request $request, string $id)
    {
        $leave = LeaveRequest::findOrFail($id);

        $leave->update($request->all());

        return response()->json($leave);
    }

    /**
     * UPDATE STATUS ONLY
     */
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'approval_status' => 'required|in:Pending,Approved,Rejected,Cancelled',
            'rejection_reason' => 'nullable|string'
        ]);

        $leave = LeaveRequest::findOrFail($id);

        $leave->approval_status = $request->approval_status;

        // if rejected
        if ($request->approval_status === 'Rejected') {
            $leave->rejection_reason = $request->rejection_reason;
        }

        // save approver
        $leave->approved_by = auth()->id();

        // approval date
        $leave->approval_date = now();

        $leave->save();

        return response()->json([
            'message' => 'Leave status updated successfully',
            'data' => $leave
        ]);
    }

    /**
     * DELETE
     */
    public function destroy(string $id)
    {
        $leave = LeaveRequest::findOrFail($id);

        $leave->delete();

        return response()->json([
            'message' => 'Leave request deleted'
        ]);
    }
}