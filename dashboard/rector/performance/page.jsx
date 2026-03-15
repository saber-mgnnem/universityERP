'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockPerformanceData = [
  { id: 1, department: 'Computer Science', avgGPA: 3.65, passRate: 94, retention: 92, ranking: 'A+' },
  { id: 2, department: 'Engineering', avgGPA: 3.58, passRate: 91, retention: 88, ranking: 'A' },
  { id: 3, department: 'Business', avgGPA: 3.42, passRate: 87, retention: 85, ranking: 'B+' },
  { id: 4, department: 'Medicine', avgGPA: 3.72, passRate: 96, retention: 94, ranking: 'A+' },
  { id: 5, department: 'Arts', avgGPA: 3.38, passRate: 85, retention: 82, ranking: 'B' },
];

const mockStudentOutcomes = [
  { id: 1, year: '2024', employed: '92%', furtherStudy: '5%', other: '3%' },
  { id: 2, year: '2023', employed: '89%', furtherStudy: '6%', other: '5%' },
  { id: 3, year: '2022', employed: '87%', furtherStudy: '7%', other: '6%' },
];

export default function PerformancePage() {
  const performanceColumns = [
    { key: 'department', label: 'Department' },
    { key: 'avgGPA', label: 'Avg GPA' },
    { key: 'passRate', label: 'Pass Rate', render: (val) => `${val}%` },
    { key: 'retention', label: 'Retention Rate', render: (val) => `${val}%` },
    { key: 'ranking', label: 'Overall Ranking', render: (val) => <StatusBadge status="approved" label={val} /> },
  ];

  const outcomeColumns = [
    { key: 'year', label: 'Graduation Year' },
    { key: 'employed', label: 'Employed' },
    { key: 'furtherStudy', label: 'Further Study' },
    { key: 'other', label: 'Other' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="rector" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Rector" currentPage="Performance" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Performance Metrics</h1>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Department Performance</h2>
              <DataTable
                columns={performanceColumns}
                data={mockPerformanceData}
                searchable={true}
                pagination={false}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Student Outcomes</h2>
              <DataTable
                columns={outcomeColumns}
                data={mockStudentOutcomes}
                searchable={false}
                pagination={false}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Institution Avg GPA</p>
                <p className="text-3xl font-bold">3.55</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Overall Pass Rate</p>
                <p className="text-3xl font-bold">90.6%</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Overall Retention</p>
                <p className="text-3xl font-bold">88.2%</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
