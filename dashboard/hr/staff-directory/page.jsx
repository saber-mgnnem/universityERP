'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockStaff = [
  { id: 1, name: 'Ahmed Hassan', employeeId: 'EMP001', position: 'Senior Lecturer', department: 'CS', email: 'ahmed@univ.edu', status: 'active', joinDate: '2015-08-20' },
  { id: 2, name: 'Fatima Ali', employeeId: 'EMP002', position: 'Lecturer', department: 'CS', email: 'fatima@univ.edu', status: 'active', joinDate: '2018-01-15' },
  { id: 3, name: 'Mohamed Ibrahim', employeeId: 'EMP003', position: 'Assistant Professor', department: 'Engineering', email: 'mohammad@univ.edu', status: 'active', joinDate: '2019-03-10' },
  { id: 4, name: 'Amina Karim', employeeId: 'EMP004', position: 'Senior Admin', department: 'HR', email: 'amina@univ.edu', status: 'active', joinDate: '2016-06-01' },
  { id: 5, name: 'Karim Ibrahim', employeeId: 'EMP005', position: 'Finance Officer', department: 'Finance', email: 'karim@univ.edu', status: 'on_leave', joinDate: '2017-02-14' },
];

export default function StaffDirectoryPage() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'joinDate', label: 'Join Date' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="hr" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="HR" currentPage="Staff Directory" />
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Staff Directory</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-3xl font-bold">{mockStaff.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold">{mockStaff.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-3xl font-bold">{mockStaff.filter(s => s.status === 'on_leave').length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={mockStaff}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
