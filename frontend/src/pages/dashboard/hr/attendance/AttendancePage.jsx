'use client';

import { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Users, FileText, UserPlus, Clock, Briefcase } from 'lucide-react';

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/dashboard/hr/staff", icon: Users },
  { label: "Contracts", href: "/dashboard/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/dashboard/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/dashboard/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
  { label: "Departments", href: "/dashboard/hr/departments", icon: Briefcase },
];

const attendanceData = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    department: "Computer Science",
    present: 18,
    absent: 1,
    leave: 1,
    late: 2,
    attendanceRate: 94,
  },
  {
    id: 2,
    name: "Prof. David Lee",
    department: "Mathematics",
    present: 19,
    absent: 0,
    leave: 1,
    late: 0,
    attendanceRate: 100,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    department: "Physics",
    present: 17,
    absent: 2,
    leave: 1,
    late: 3,
    attendanceRate: 88,
  },
  {
    id: 4,
    name: "James Brown",
    department: "Biology",
    present: 15,
    absent: 1,
    leave: 4,
    late: 2,
    attendanceRate: 82,
  },
  {
    id: 5,
    name: "Maria Garcia",
    department: "Engineering",
    present: 18,
    absent: 0,
    leave: 2,
    late: 1,
    attendanceRate: 95,
  },
];

export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState('January 2026');

  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Attendance Tracking</h1>
            <Button className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Report
            </Button>
          </div>

          {/* Month Selector */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background cursor-pointer"
                >
                  <option>January 2026</option>
                  <option>December 2025</option>
                  <option>November 2025</option>
                  <option>October 2025</option>
                </select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Staff Attendance - {selectedMonth}</CardTitle>
              <CardDescription>View attendance records for all staff members</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Department</th>
                      <th className="text-center py-3 px-6 font-medium text-muted-foreground">Present</th>
                      <th className="text-center py-3 px-6 font-medium text-muted-foreground">Absent</th>
                      <th className="text-center py-3 px-6 font-medium text-muted-foreground">Leave</th>
                      <th className="text-center py-3 px-6 font-medium text-muted-foreground">Late</th>
                      <th className="text-center py-3 px-6 font-medium text-muted-foreground">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map(record => (
                      <tr key={record.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-6">
                          <p className="font-medium text-foreground">{record.name}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{record.department}</td>
                        <td className="py-4 px-6 text-center">
                          <Badge className="bg-green-500/10 text-green-700 border-green-500/20 border">
                            {record.present}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge className="bg-red-500/10 text-red-700 border-red-500/20 border">
                            {record.absent}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20 border">
                            {record.leave}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20 border">
                            {record.late}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-primary">{record.attendanceRate}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
     
  );
}
