'use client';

import { LineChartComponent, BarChartComponent, PieChartComponent } from '@/components/dashboard/chart';

const analyticsData = [
  { name: 'Jan', users: 400, logins: 2400, storage: 1200 },
  { name: 'Feb', users: 500, logins: 2210, storage: 1300 },
  { name: 'Mar', users: 620, logins: 2290, storage: 1400 },
  { name: 'Apr', users: 750, logins: 2000, storage: 1500 },
  { name: 'May', users: 890, logins: 2181, storage: 1700 },
  { name: 'Jun', users: 1050, logins: 2500, storage: 1900 },
];

const storageData = [
  { name: 'Documents', value: 400 },
  { name: 'Media', value: 300 },
  { name: 'Database', value: 300 },
  { name: 'Backups', value: 200 },
];

const roleDistribution = [
  { name: 'Admin', value: 5 },
  { name: 'Rector', value: 3 },
  { name: 'Department Head', value: 12 },
  { name: 'Professor', value: 85 },
  { name: 'Student', value: 2500 },
  { name: 'HR', value: 8 },
  { name: 'Finance', value: 6 },
];

export default function AnalyticsPage() {
  return (
  
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">System Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChartComponent
                data={analyticsData}
                dataKey="users"
                stroke="#3b82f6"
                title="Active Users Trend"
              />
              <BarChartComponent
                data={analyticsData}
                dataKey="logins"
                fill="#10b981"
                title="System Logins"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChartComponent
                data={storageData}
                title="Storage Usage"
              />
              <PieChartComponent
                data={roleDistribution}
                title="User Role Distribution"
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">145ms</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold">99.9%</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Database Size</p>
                  <p className="text-2xl font-bold">2.3GB</p>
                </div>
              </div>
            </div>
          </div>
        </main>
    
  );
}
