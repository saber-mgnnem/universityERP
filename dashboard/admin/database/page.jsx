'use client';

import { useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockBackups = [
  { id: 1, date: '2024-02-13 02:00', size: '1.2GB', status: 'completed', duration: '45s' },
  { id: 2, date: '2024-02-12 02:00', size: '1.1GB', status: 'completed', duration: '43s' },
  { id: 3, date: '2024-02-11 02:00', size: '1.0GB', status: 'completed', duration: '41s' },
  { id: 4, date: '2024-02-10 02:00', size: '1.0GB', status: 'completed', duration: '42s' },
];

export default function DatabasePage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [integrityCheckResult, setIntegrityCheckResult] = useState(null);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert('Backup completed successfully!');
    }, 3000);
  };

  const handleIntegrityCheck = () => {
    setIntegrityCheckResult('All tables verified. No errors found. ✓');
  };

  const backupColumns = [
    { key: 'date', label: 'Backup Date' },
    { key: 'size', label: 'Size' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Admin" currentPage="Database" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Database Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Database Size</p>
                <p className="text-3xl font-bold">2.3GB</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Tables</p>
                <p className="text-3xl font-bold">45</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-3xl font-bold">2.5M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Last Backup</p>
                <p className="text-lg font-bold">2 hours ago</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Backup & Maintenance</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleBackup}
                  disabled={isBackingUp}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  <RefreshCw className={`h-5 w-5 ${isBackingUp ? 'animate-spin' : ''}`} />
                  {isBackingUp ? 'Backing up...' : 'Create Backup'}
                </button>
                <button
                  onClick={handleIntegrityCheck}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
                >
                  Verify Integrity
                </button>
              </div>
              {integrityCheckResult && (
                <p className="text-sm text-green-600 font-semibold">{integrityCheckResult}</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Backup History</h2>
              <DataTable columns={backupColumns} data={mockBackups} searchable={false} pagination={true} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
