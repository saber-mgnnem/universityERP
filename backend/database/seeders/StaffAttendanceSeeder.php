<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffAttendanceRecord;
use App\Models\User;
use Carbon\Carbon;

class StaffAttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $staffUsers = User::limit(10)->get(); // adjust as needed

        $statuses = ['Present', 'Absent', 'Late', 'Leave'];

        for ($i = 0; $i < 30; $i++) {

            $date = Carbon::now()->subDays($i)->toDateString();

            foreach ($staffUsers as $user) {

                $status = $statuses[array_rand($statuses)];

                $isLate = $status === 'Late';

                StaffAttendanceRecord::create([
                    'user_id' => $user->id,
                    'attendance_date' => $date,
                    'attendance_status' => $status,

                    'check_in_time' => $status !== 'Absent'
                        ? Carbon::createFromTime(rand(7, 10), rand(0, 59))->format('H:i:s')
                        : null,

                    'check_out_time' => $status !== 'Absent'
                        ? Carbon::createFromTime(rand(14, 18), rand(0, 59))->format('H:i:s')
                        : null,

                    'minutes_late' => $isLate ? rand(5, 90) : 0,
                    'is_late' => $isLate,

                    'auto_marked_absent' => $status === 'Absent',

                    'remarks' => $status === 'Absent'
                        ? 'Auto marked absent'
                        : null,

                    'recorded_by' => $user->id,
                ]);
            }
        }
    }
}