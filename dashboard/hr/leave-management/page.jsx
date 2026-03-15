'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import StatusBadge from '@/components/dashboard/status-badge';
import { Plus } from 'lucide-react';

const mockLeaveRequests = [
  { id: 1, employee: 'Ahmed Hassan', type: 'Annual', startDate: '2024-03-01', endDate: '2024-03-05', days: 5, status: 'pending' },
  { id: 2, employee: 'Fatima Ali', type: 'Sick', startDate: '2024-02-15', endDate: '2024-02-16', days: 2, status: 'approved' },
  { id: 3, employee: 'Mohamed Ibrahim', type: 'Annual', startDate: '2024-04-10', endDate: '2024-04-14', days: 5, status: 'approved' },
  { id: 4, employee: 'Amina Karim', type: 'Maternity', startDate: '2024-02-20', endDate: '2024-05-20', days: 90, status: 'approved' },
];

const leaveBalances = [
  { id: 1, employee: 'Ahmed Hassan', annual: 15, sick: 10, maternity: 0, personal: 3 },
  { id: 2, employee: 'Fatima Ali', annual: 18, sick: 8, maternity: 0, personal: 3 },
  { id: 3, employee: 'Mohamed Ibrahim', annual: 12, sick: 10, maternity: 0, personal: 3 },
];

export default function LeaveManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitRequest = (formData) => {
    console.log('Leave request submitted:', formData);
    setIsModalOpen(false);
  };

  const requestColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'type', label: 'Leave Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'days', label: 'Days' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const balanceColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'annual', label: 'Annual Leave' },
    { key: 'sick', label: 'Sick Leave' },
    { key: 'maternity', label: 'Maternity Leave' },
    { key: 'personal', label: 'Personal Leave' },
  ];

  const formFields = [
    { name: 'employee', label: 'Employee', type: 'select', options: ['Ahmed Hassan', 'Fatima Ali', 'Mohamed Ibrahim', 'Amina Karim'], required: true },
    { name: 'type', label: 'Leave Type', type: 'select', options: ['Annual', 'Sick', 'Maternity', 'Personal'], required: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: true },
    { name: 'reason', label: 'Reason', type: 'textarea', required: true },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="hr" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="HR" currentPage="Leave Management" />
        <main className="p-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Leave Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                New Request
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
              <DataTable
                columns={requestColumns}
                data={mockLeaveRequests}
                searchable={true}
                pagination={true}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Leave Balances</h2>
              <DataTable
                columns={balanceColumns}
                data={leaveBalances}
                searchable={true}
                pagination={false}
              />
            </div>
          </div>
        </main>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Leave Request"
        fields={formFields}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
}
