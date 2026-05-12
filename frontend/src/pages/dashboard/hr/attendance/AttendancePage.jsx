'use client';

import { useEffect, useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';

import API from '@/services/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AttendancePage() {

  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [attendance, setAttendance] = useState([]);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  // ================= FETCH ATTENDANCE =================
  const fetchAttendance = async () => {
    try {
      const res = await API.get('/staff-attendance', authHeaders);
      setAttendance(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ================= AUTO ABSENCE =================
  const handleAutoAbsence = async () => {
    try {
      await API.post('/staff-attendance/auto-absence', {}, authHeaders);
      fetchAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EXPORT =================
  const handleExport = async () => {
    try {
      const res = await API.get('/staff-attendance', authHeaders);

      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(res.data));

      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'attendance.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= STATUS COLORS =================
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'Absent':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'Late':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'Leave':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  return (
    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Tracking</h1>

        <div className="flex gap-2">
          <Button onClick={handleAutoAbsence}>
            Auto Absence
          </Button>

          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export
          </Button>
        </div>
      </div>

      {/* FILTER */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              <option value="2026-01">January 2026</option>
              <option value="2025-12">December 2025</option>
              <option value="2025-11">November 2025</option>
              <option value="2025-10">October 2025</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Attendance</CardTitle>
          <CardDescription>Live HR attendance tracking system</CardDescription>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">

          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4">Staff</th>
                <th className="text-left p-4">E_mail</th>
                <th className="text-left p-4">Date</th>
                <th className="text-center p-4">Check In</th>
                <th className="text-center p-4">Check Out</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Late (min)</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/30">

                  {/* STAFF */}
                  <td className="p-4 font-medium">
                    {record.staff?.first_name || 'Unknown'}
                  </td>
                   <td className="p-4 font-medium">
                    {record.staff?.email || 'Unknown'}
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-muted-foreground">
                    {record.attendance_date}
                  </td>

                  {/* CHECK IN */}
                  <td className="p-4 text-center">
                    {record.check_in_time || '--'}
                  </td>

                  {/* CHECK OUT */}
                  <td className="p-4 text-center">
                    {record.check_out_time || '--'}
                  </td>

                  {/* STATUS */}
                  <td className="p-4 text-center">
                    <Badge className={`${getStatusColor(record.attendance_status)} border`}>
                      {record.attendance_status}
                    </Badge>
                  </td>

                  {/* LATE */}
                  <td className="p-4 text-center">
                    {record.minutes_late}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </CardContent>
      </Card>

    </main>
  );
}