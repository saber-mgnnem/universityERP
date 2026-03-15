'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockSessions = [
  { id: 1, user: 'John Doe', device: 'Chrome - Windows', lastActivity: '2 min ago', ipAddress: '192.168.1.100', status: 'active' },
  { id: 2, user: 'Jane Smith', device: 'Safari - Mac', lastActivity: '15 min ago', ipAddress: '192.168.1.101', status: 'active' },
  { id: 3, user: 'Mike Johnson', device: 'Firefox - Linux', lastActivity: '2 hours ago', ipAddress: '192.168.1.102', status: 'active' },
];

const mockLoginLogs = [
  { id: 1, user: 'John Doe', timestamp: '2024-02-13 14:30', status: 'success', ipAddress: '192.168.1.100' },
  { id: 2, user: 'Jane Smith', timestamp: '2024-02-13 14:25', status: 'success', ipAddress: '192.168.1.101' },
  { id: 3, user: 'Unknown', timestamp: '2024-02-13 14:15', status: 'failed', ipAddress: '203.0.113.45' },
  { id: 4, user: 'Mike Johnson', timestamp: '2024-02-13 14:10', status: 'success', ipAddress: '192.168.1.102' },
];

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 12,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChar: true,
  });

  const sessionColumns = [
    { key: 'user', label: 'User' },
    { key: 'device', label: 'Device' },
    { key: 'lastActivity', label: 'Last Activity' },
    { key: 'ipAddress', label: 'IP Address' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const loginColumns = [
    { key: 'user', label: 'User' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'ipAddress', label: 'IP Address' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Admin" currentPage="Security" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Security Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Failed Logins Today</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">2FA Enabled Users</p>
                <p className="text-3xl font-bold">267</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Password Policy</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Minimum Length: {passwordPolicy.minLength} characters</span>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={passwordPolicy.minLength}
                    onChange={(e) => setPasswordPolicy(prev => ({ ...prev, minLength: parseInt(e.target.value) }))}
                    className="w-32"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireUppercase}
                    onChange={(e) => setPasswordPolicy(prev => ({ ...prev, requireUppercase: e.target.checked }))}
                  />
                  Require Uppercase Letters
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireNumbers}
                    onChange={(e) => setPasswordPolicy(prev => ({ ...prev, requireNumbers: e.target.checked }))}
                  />
                  Require Numbers
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireSpecialChar}
                    onChange={(e) => setPasswordPolicy(prev => ({ ...prev, requireSpecialChar: e.target.checked }))}
                  />
                  Require Special Characters
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Active Sessions</h2>
              <DataTable columns={sessionColumns} data={mockSessions} searchable={false} pagination={false} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Login Activity</h2>
              <DataTable columns={loginColumns} data={mockLoginLogs} searchable={true} pagination={true} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
