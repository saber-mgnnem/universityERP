'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';

import { BarChartComponent } from '@/components/dashboard/chart';

const mockReports = [
  { id: 1, title: 'Monthly Grade Distribution', date: '2024-02-10', size: '1.2MB' },
  { id: 2, title: 'Enrollment Analytics', date: '2024-02-08', size: '2.1MB' },
  { id: 3, title: 'Faculty Workload Report', date: '2024-02-05', size: '0.8MB' },
  { id: 4, title: 'Student Performance Analysis', date: '2024-02-01', size: '1.8MB' },
];

const gradeDistribution = [
  { name: 'A', value: 45 },
  { name: 'B', value: 95 },
  { name: 'C', value: 120 },
  { name: 'D', value: 35 },
  { name: 'F', value: 15 },
];

export default function ReportsPage() {
  return (

        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Department Reports</h1>

            <BarChartComponent
              data={gradeDistribution}
              dataKey="value"
              fill="#3b82f6"
              title="Grade Distribution"
            />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Available Reports</h2>
              <div className="space-y-3">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Generate New Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Type</label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                    <option>Grade Distribution</option>
                    <option>Enrollment Analytics</option>
                    <option>Faculty Workload</option>
                    <option>Student Performance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Semester</label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                    <option>Spring 2024</option>
                    <option>Fall 2023</option>
                    <option>Spring 2023</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                Generate Report
              </button>
            </div>
          </div>
        </main>
      
  );
}
