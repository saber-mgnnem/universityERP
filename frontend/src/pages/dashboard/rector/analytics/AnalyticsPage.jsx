'use client';
import { LineChartComponent, BarChartComponent } from '@/components/dashboard/chart';

const enrollmentTrend = [
  { name: '2019', students: 3500 },
  { name: '2020', students: 3800 },
  { name: '2021', students: 4200 },
  { name: '2022', students: 4600 },
  { name: '2023', students: 5000 },
  { name: '2024', students: 5420 },
];

const departmentPerformance = [
  { name: 'CS', performance: 92 },
  { name: 'Engineering', performance: 88 },
  { name: 'Business', performance: 85 },
  { name: 'Medicine', performance: 95 },
  { name: 'Arts', performance: 82 },
];

const graduationRates = [
  { name: '2024', value: 87 },
  { name: '2023', value: 84 },
  { name: '2022', value: 82 },
  { name: '2021', value: 80 },
];

export default function AnalyticsPage() {
  return (

        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Institutional Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">5,420</p>
                <p className="text-xs text-green-600 mt-1">+8.4% from last year</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-3xl font-bold">358</p>
                <p className="text-xs text-green-600 mt-1">+2.3% from last year</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Graduation Rate</p>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-xs text-green-600 mt-1">+3% from last year</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg GPA</p>
                <p className="text-3xl font-bold">3.42</p>
                <p className="text-xs text-green-600 mt-1">+0.15 from last year</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChartComponent
                data={enrollmentTrend}
                dataKey="students"
                stroke="#3b82f6"
                title="Enrollment Trend"
              />
              <BarChartComponent
                data={departmentPerformance}
                dataKey="performance"
                fill="#10b981"
                title="Department Performance"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChartComponent
                data={graduationRates}
                dataKey="value"
                stroke="#f59e0b"
                title="Graduation Rates"
              />
            </div>
          </div>
        </main>

  );
}
