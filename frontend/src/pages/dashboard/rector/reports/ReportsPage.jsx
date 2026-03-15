'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';


const mockReports = [
  {
    id: 1,
    title: 'Annual Enrollment Report 2024',
    date: '2024-02-10',
    type: 'Enrollment',
    size: '2.3MB',
  },
  {
    id: 2,
    title: 'Faculty Performance Review',
    date: '2024-02-08',
    type: 'Performance',
    size: '1.8MB',
  },
  {
    id: 3,
    title: 'Budget Utilization Report',
    date: '2024-02-05',
    type: 'Finance',
    size: '1.2MB',
  },
  {
    id: 4,
    title: 'Graduation Outcomes Analysis',
    date: '2024-02-01',
    type: 'Graduation',
    size: '3.1MB',
  },
  {
    id: 5,
    title: 'Student Satisfaction Survey',
    date: '2024-01-28',
    type: 'Satisfaction',
    size: '1.5MB',
  },
];

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState('all');

  const filteredReports =
    selectedReportType === 'all'
      ? mockReports
      : mockReports.filter((r) => r.type === selectedReportType);

  const reportTypes = ['Enrollment', 'Performance', 'Finance', 'Graduation', 'Satisfaction'];

  return (
 
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Institutional Reports</h1>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedReportType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedReportType === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                All Reports
              </button>
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedReportType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedReportType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">{report.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • {report.date} • {report.size}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Generate New Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Type</label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                    <option>Enrollment</option>
                    <option>Performance</option>
                    <option>Finance</option>
                    <option>Graduation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Academic Year</label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
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
