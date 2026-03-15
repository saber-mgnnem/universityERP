'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import { BarChartComponent } from '@/components/dashboard/chart';
import FormModal from '@/components/dashboard/form-modal';
import { Plus } from 'lucide-react';

const budgetData = [
  { name: 'CS', allocated: 250 },
  { name: 'Engineering', allocated: 380 },
  { name: 'Business', allocated: 180 },
  { name: 'Medicine', allocated: 500 },
  { name: 'Arts', allocated: 120 },
];

const mockFunds = [
  { id: 1, department: 'Computer Science', allocated: '$250,000', spent: '$195,000', balance: '$55,000' },
  { id: 2, department: 'Engineering', allocated: '$380,000', spent: '$320,000', balance: '$60,000' },
  { id: 3, department: 'Business', allocated: '$180,000', spent: '$155,000', balance: '$25,000' },
  { id: 4, department: 'Medicine', allocated: '$500,000', spent: '$445,000', balance: '$55,000' },
  { id: 5, department: 'Arts', allocated: '$120,000', spent: '$95,000', balance: '$25,000' },
];

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAllocate = (formData) => {
    console.log('Budget allocated:', formData);
    setIsModalOpen(false);
  };

  const formFields = [
    { name: 'department', label: 'Department', type: 'select', options: ['CS', 'Engineering', 'Business', 'Medicine', 'Arts'], required: true },
    { name: 'amount', label: 'Budget Amount', placeholder: '$', required: true },
    { name: 'fiscalYear', label: 'Fiscal Year', type: 'select', options: ['2024', '2025', '2026'], required: true },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="rector" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Rector" currentPage="Budget" />
        <main className="p-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Budget Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Allocate Funds
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold">$1.43M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-bold">$1.21M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-3xl font-bold">$220K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Utilization</p>
                <p className="text-3xl font-bold">84.6%</p>
              </div>
            </div>

            <BarChartComponent
              data={budgetData}
              dataKey="allocated"
              fill="#3b82f6"
              title="Department Budget Allocation (in thousands)"
            />

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Fund Allocation by Department</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Allocated</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Spent</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Balance</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFunds.map((fund) => {
                      const allocated = parseInt(fund.allocated.replace(/[^0-9]/g, ''));
                      const spent = parseInt(fund.spent.replace(/[^0-9]/g, ''));
                      const utilization = Math.round((spent / allocated) * 100);
                      return (
                        <tr key={fund.id} className="border-t border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm">{fund.department}</td>
                          <td className="px-6 py-4 text-sm">{fund.allocated}</td>
                          <td className="px-6 py-4 text-sm">{fund.spent}</td>
                          <td className="px-6 py-4 text-sm text-green-600">{fund.balance}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${utilization}%` }}
                              ></div>
                            </div>
                            {utilization}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Allocate Budget"
        fields={formFields}
        onSubmit={handleAllocate}
      />
    </div>
  );
}
