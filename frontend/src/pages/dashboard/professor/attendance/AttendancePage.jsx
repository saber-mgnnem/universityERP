'use client';

import { useState } from 'react';
import DataTable from '@/components/dashboard/data-table';

const mockAttendance = [
  { id: 1, studentId: 'CS001', name: 'Ahmed Mohammad', present: 42, absent: 2, late: 1, percentage: '95%' },
  { id: 2, studentId: 'CS002', name: 'Fatima Al-Mansoury', present: 44, absent: 0, late: 0, percentage: '100%' },
  { id: 3, studentId: 'CS003', name: 'Mohamed Ali', present: 40, absent: 3, late: 1, percentage: '91%' },
  { id: 4, studentId: 'CS004', name: 'Amina Hassan', present: 43, absent: 1, late: 0, percentage: '98%' },
  { id: 5, studentId: 'CS005', name: 'Karim Ibrahim', present: 38, absent: 5, late: 1, percentage: '86%' },
];

export default function AttendancePage() {
  const [course, setCourse] = useState('CS101');

  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'present', label: 'Present' },
    { key: 'absent', label: 'Absent' },
    { key: 'late', label: 'Late' },
    { key: 'percentage', label: 'Attendance %', render: (val) => <span className="font-bold">{val}</span> },
  ];

  return (

        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Attendance Tracking</h1>

            <div className="flex gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Select Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background"
                >
                  <option>CS101</option>
                  <option>CS201</option>
                  <option>CS301</option>
                </select>
              </div>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Download Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-3xl font-bold">44</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Average Attendance</p>
                <p className="text-3xl font-bold">94%</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Absences</p>
                <p className="text-3xl font-bold">11</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Late</p>
                <p className="text-3xl font-bold">3</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={mockAttendance}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
     
  );
}
