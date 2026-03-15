'use client';

import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockReconciliation = [
  { id: 1, date: 'February 2024', bankBalance: '$250,000', systemBalance: '$248,500', discrepancy: '$1,500', status: 'pending' },
  { id: 2, date: 'January 2024', bankBalance: '$215,000', systemBalance: '$215,000', discrepancy: '$0', status: 'completed' },
  { id: 3, date: 'December 2023', bankBalance: '$190,000', systemBalance: '$190,000', discrepancy: '$0', status: 'completed' },
];

const mockDiscrepancies = [
  { id: 1, date: '2024-02-09', description: 'Bank fee not recorded', amount: '$500', category: 'Fee' },
  { id: 2, date: '2024-02-07', description: 'Pending deposit delay', amount: '$1,000', category: 'Timing' },
];

export default function ReconciliationPage() {
  const columns = [
    { key: 'date', label: 'Period' },
    { key: 'bankBalance', label: 'Bank Balance' },
    { key: 'systemBalance', label: 'System Balance' },
    { key: 'discrepancy', label: 'Discrepancy' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const discrepancyColumns = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'category', label: 'Category' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="finance" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Finance" currentPage="Reconciliation" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Bank Reconciliation</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Current Bank Balance</p>
                <p className="text-3xl font-bold">$250K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">System Balance</p>
                <p className="text-3xl font-bold">$248.5K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Current Discrepancy</p>
                <p className="text-3xl font-bold text-orange-600">$1.5K</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Reconciliation History</h2>
              <DataTable
                columns={columns}
                data={mockReconciliation}
                searchable={true}
                pagination={false}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Outstanding Discrepancies</h2>
              <DataTable
                columns={discrepancyColumns}
                data={mockDiscrepancies}
                searchable={true}
                pagination={false}
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Actions</h2>
              <div className="flex gap-3 flex-wrap">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                  Start New Reconciliation
                </button>
                <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
