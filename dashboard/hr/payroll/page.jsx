'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';

const mockPayroll = [
  { id: 1, employee: 'Ahmed Hassan', position: 'Senior Lecturer', salary: '$5,500', tax: '$825', net: '$4,675', payDate: '2024-02-15' },
  { id: 2, employee: 'Fatima Ali', position: 'Lecturer', salary: '$4,200', tax: '$630', net: '$3,570', payDate: '2024-02-15' },
  { id: 3, employee: 'Mohamed Ibrahim', position: 'Assistant Professor', salary: '$4,800', tax: '$720', net: '$4,080', payDate: '2024-02-15' },
  { id: 4, employee: 'Amina Karim', position: 'Senior Admin', salary: '$3,500', tax: '$525', net: '$2,975', payDate: '2024-02-15' },
];

const payrollSummary = [
  { month: 'January 2024', totalSalaries: '$45,000', totalDeductions: '$6,750', totalNet: '$38,250' },
  { month: 'February 2024', totalSalaries: '$45,000', totalDeductions: '$6,750', totalNet: '$38,250' },
];

export default function PayrollPage() {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'position', label: 'Position' },
    { key: 'salary', label: 'Gross Salary' },
    { key: 'tax', label: 'Tax' },
    { key: 'net', label: 'Net Salary' },
    { key: 'payDate', label: 'Pay Date' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="hr" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="HR" currentPage="Payroll" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Payroll Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-3xl font-bold">$45K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-3xl font-bold">$6.7K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Net Payroll</p>
                <p className="text-3xl font-bold">$38.2K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-3xl font-bold">{mockPayroll.length}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Current Payroll</h2>
              <DataTable
                columns={columns}
                data={mockPayroll}
                searchable={true}
                pagination={false}
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Payroll History</h2>
              <div className="space-y-3">
                {payrollSummary.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold">{item.month}</p>
                      <p className="text-sm text-muted-foreground">Total: {item.totalNet}</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
