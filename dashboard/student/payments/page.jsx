'use client';

import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockPayments = [
  { id: 1, semester: 'Spring 2024', amount: '$8,500', dueDate: '2024-01-15', status: 'paid', paidDate: '2024-01-10' },
  { id: 2, semester: 'Fall 2023', amount: '$8,500', dueDate: '2023-09-01', status: 'paid', paidDate: '2023-08-28' },
  { id: 3, semester: 'Spring 2023', amount: '$8,000', dueDate: '2023-01-15', status: 'paid', paidDate: '2023-01-12' },
];

const feeBreakdown = [
  { id: 1, description: 'Tuition Fee', amount: '$6,000' },
  { id: 2, description: 'Lab Fee', amount: '$800' },
  { id: 3, description: 'Technology Fee', amount: '$500' },
  { id: 4, description: 'Activities Fee', amount: '$200' },
];

export default function PaymentsPage() {
  const columns = [
    { key: 'semester', label: 'Semester' },
    { key: 'amount', label: 'Amount' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'paidDate', label: 'Paid Date' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Student" currentPage="Payments" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Tuition Payments</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold">$0</p>
                <p className="text-xs text-green-600 mt-1">Up to date</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-3xl font-bold">$25,000</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-3xl font-bold">Aug 2024</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
              <DataTable
                columns={columns}
                data={mockPayments}
                searchable={false}
                pagination={false}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Current Fee Breakdown
                </h2>
                <div className="space-y-3">
                  {feeBreakdown.map((fee) => (
                    <div key={fee.id} className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{fee.description}</span>
                      <span className="font-bold">{fee.amount}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded border border-primary">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">$7,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </h2>
                <div className="space-y-3">
                  <button className="w-full p-3 rounded-lg border border-input hover:bg-muted transition text-left">
                    <p className="font-semibold">Credit Card</p>
                    <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                  </button>
                  <button className="w-full p-3 rounded-lg border border-input hover:bg-muted transition text-left">
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground">Direct deposit</p>
                  </button>
                  <button className="w-full p-3 rounded-lg border-2 border-primary bg-primary/10 hover:bg-primary/20 transition text-left">
                    <p className="font-semibold text-primary">Make Payment</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
