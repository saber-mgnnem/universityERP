'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import SearchBar from '@/components/dashboard/search-bar';
import StatusBadge from '@/components/dashboard/status-badge';

const mockLogs = [
  { id: 1, timestamp: '2024-02-13 14:35', user: 'John Doe', action: 'Login', module: 'Auth', status: 'success', details: 'User logged in successfully' },
  { id: 2, timestamp: '2024-02-13 14:34', user: 'Jane Smith', action: 'Update', module: 'Users', status: 'success', details: 'User profile updated' },
  { id: 3, timestamp: '2024-02-13 14:33', user: 'System', action: 'Backup', module: 'Database', status: 'success', details: 'Automated backup completed' },
  { id: 4, timestamp: '2024-02-13 14:32', user: 'Mike Johnson', action: 'Delete', module: 'Reports', status: 'success', details: 'Report deleted' },
  { id: 5, timestamp: '2024-02-13 14:30', user: 'Unknown', action: 'Login', module: 'Auth', status: 'failed', details: 'Invalid credentials' },
  { id: 6, timestamp: '2024-02-13 14:25', user: 'Sarah Williams', action: 'Create', module: 'Courses', status: 'success', details: 'New course created' },
];

export default function LogsPage() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);

  const handleSearch = (query, filters) => {
    let result = logs.filter(log => {
      const matchesQuery = !query || 
        log.user.toLowerCase().includes(query.toLowerCase()) ||
        log.action.toLowerCase().includes(query.toLowerCase()) ||
        log.module.toLowerCase().includes(query.toLowerCase());
      
      const matchesFilter = !filters.module || log.module === filters.module;
      return matchesQuery && matchesFilter;
    });
    setFilteredLogs(result);
  };

  const columns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'user', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'module', label: 'Module' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'details', label: 'Details' },
  ];

  const filters = [
    {
      name: 'module',
      label: 'Module',
      options: ['Auth', 'Users', 'Database', 'Reports', 'Courses'],
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Admin" currentPage="Logs" />
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">System Activity Logs</h1>

            <SearchBar
              placeholder="Search by user, action, or module..."
              onSearch={handleSearch}
              filters={filters}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Logs</p>
                <p className="text-3xl font-bold">{logs.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold">98.3%</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Failed Actions</p>
                <p className="text-3xl font-bold">1</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredLogs}
              searchable={false}
              pagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
