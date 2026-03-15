'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockTransactions = [
  { id: 1, date: '2024-02-13', description: 'Student Tuition Payment', amount: '$4,500', type: 'income', reference: 'TXN001', status: 'completed' },
  { id: 2, date: '2024-02-12', description: 'Payroll Processing', amount: '$38,250', type: 'expense', reference: 'PAY002', status: 'completed' },
  { id: 3, date: '2024-02-11', description: 'Equipment Purchase', amount: '$12,000', type: 'expense', reference: 'PUR003', status: 'completed' },
  { id: 4, date: '2024-02-10', description: 'Student Tuition Payment', amount: '$3,200', type: 'income', reference: 'TXN004', status: 'completed' },
  { id: 5, date: '2024-02-09', description: 'Utility Bills', amount: '$5,600', type: 'expense', reference: 'UTL005', status: 'pending' },
];

export default function TransactionsPage() {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'type', label: 'Type', render: (val) => <span className={val === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{val}</span> },
    { key: 'amount', label: 'Amount' },
    { key: 'reference', label: 'Reference' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const totalIncome = mockTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseInt(t.amount.replace(/[^0-9]/g, '')), 0);
  const totalExpense = mockTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseInt(t.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="finance" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Finance" currentPage="Transactions" />
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Transaction History</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-3xl font-bold text-green-600">${(totalIncome / 1000).toFixed(1)}K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">${(totalExpense / 1000).toFixed(1)}K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className="text-3xl font-bold text-blue-600">${((totalIncome - totalExpense) / 1000).toFixed(1)}K</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={mockTransactions}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
