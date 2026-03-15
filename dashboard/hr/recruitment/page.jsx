'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockJobPostings = [
  { id: 1, position: 'Assistant Professor', department: 'CS', status: 'open', posted: '2024-02-01', applications: 12 },
  { id: 2, position: 'Lecturer', department: 'Engineering', status: 'open', posted: '2024-01-20', applications: 8 },
  { id: 3, position: 'Lab Technician', department: 'Science', status: 'closed', posted: '2024-01-15', applications: 15 },
];

const mockApplications = [
  { id: 1, candidate: 'John Smith', position: 'Assistant Professor', appliedDate: '2024-02-05', status: 'under_review', experience: '3 years' },
  { id: 2, candidate: 'Sarah Johnson', position: 'Assistant Professor', appliedDate: '2024-02-03', status: 'interview', experience: '5 years' },
  { id: 3, candidate: 'Mike Davis', position: 'Lecturer', appliedDate: '2024-02-01', status: 'offered', experience: '4 years' },
  { id: 4, candidate: 'Emma Wilson', position: 'Lab Technician', appliedDate: '2024-01-25', status: 'rejected', experience: '2 years' },
];

export default function RecruitmentPage() {
  const jobColumns = [
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val === 'open' ? 'active' : 'inactive'} label={val} /> },
    { key: 'posted', label: 'Posted Date' },
    { key: 'applications', label: 'Applications' },
  ];

  const appColumns = [
    { key: 'candidate', label: 'Candidate' },
    { key: 'position', label: 'Position' },
    { key: 'experience', label: 'Experience' },
    { key: 'appliedDate', label: 'Applied Date' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="hr" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="HR" currentPage="Recruitment" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Recruitment Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active Postings</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold">{mockApplications.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">In Interview</p>
                <p className="text-3xl font-bold">{mockApplications.filter(a => a.status === 'interview').length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Offers Made</p>
                <p className="text-3xl font-bold">{mockApplications.filter(a => a.status === 'offered').length}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Job Postings</h2>
              <DataTable
                columns={jobColumns}
                data={mockJobPostings}
                searchable={true}
                pagination={false}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Applications</h2>
              <DataTable
                columns={appColumns}
                data={mockApplications}
                searchable={true}
                pagination={true}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
