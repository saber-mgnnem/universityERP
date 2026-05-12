<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StaffAttendanceRecord;
class StaffAttendanceController extends Controller
{
    public function index()
    {
           return StaffAttendanceRecord::with('staff')->get();

    }

    // ================= AUTO ABSENCE =================
    public function autoMarkAbsence()
    {
        $today = now()->toDateString();

        $staff = \App\Models\User::all();

        foreach ($staff as $user) {

            StaffAttendanceRecord::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'attendance_date' => $today,
                ],
                [
                    'attendance_status' => 'Absent',
                    'auto_marked_absent' => true,
                    'recorded_by' => auth()->id(),
                ]
            );
        }

        return response()->json(['message' => 'Auto absence completed']);
    }

    // ================= CHECK IN =================
    public function checkIn()
    {
        $userId = auth()->id();
        $now = now();

        $lateTime = now()->setTime(8, 0);

        $isLate = $now->gt($lateTime);
        $minutesLate = $isLate ? $now->diffInMinutes($lateTime) : 0;

        $record = StaffAttendanceRecord::updateOrCreate(
            [
                'user_id' => $userId,
                'attendance_date' => now()->toDateString(),
            ],
            [
                'check_in_time' => $now->format('H:i:s'),
                'attendance_status' => $isLate ? 'Late' : 'Present',
                'is_late' => $isLate,
                'minutes_late' => $minutesLate,
                'auto_marked_absent' => false,
                'recorded_by' => auth()->id(),
            ]
        );

        return response()->json($record);
    }

    // ================= CHECK OUT =================
    public function checkOut()
    {
        $record = StaffAttendanceRecord::where('user_id', auth()->id())
            ->whereDate('attendance_date', now())
            ->first();

        if ($record) {
            $record->update([
                'check_out_time' => now()->format('H:i:s'),
            ]);
        }

        return response()->json($record);
    }
}