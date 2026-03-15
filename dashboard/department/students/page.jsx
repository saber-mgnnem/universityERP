'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockStudents = [
  { id: 1, name: 'Ahmed Mohammad', studentId: 'CS001', email: 'ahmed@student.edu', gpa: 3.8, courses: 5, status: 'active' },
  { id: 2, name: 'Fatima Al-Mansoury', studentId: 'CS002', email: 'fatima@student.edu', gpa: 3.6, courses: 5, status: 'active' },
  { id: 3, name: 'Mohamed Ali', studentId: 'CS003', email: 'mohammedali@student.edu', gpa: 3.4, courses: 4, status: 'active' },
  { id: 4, name: 'Amina Hassan', studentId: 'CS004', email: 'amina@student.edu', gpa: 3.9, courses: 5, status: 'active' },
  { id: 5, name: 'Karim Ibrahim', studentId: 'CS005', email: 'karim@student.edu', gpa: 3.2, courses: 4, status: 'warning' },
  { id: 6, name: 'Laila Noor', studentId: 'CS006', email: 'laila@student.edu', gpa: 3.7, courses: 5, status: 'active' },
];

export default function StudentsPage() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'email', label: 'Email' },
    { key: 'gpa', label: 'GPA' },
    { key: 'courses', label: 'Courses' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="department" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Department Head" currentPage="Students" />
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Student Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{mockStudents.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg GPA</p>
                <p className="text-3xl font-bold">3.6</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-3xl font-bold">1</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={mockStudents}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
