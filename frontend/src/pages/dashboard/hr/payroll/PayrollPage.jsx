'use client';

import { useState } from 'react';
import { Plus, Download, MoreVertical } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Users, FileText, Calendar, UserPlus, Clock, Briefcase } from 'lucide-react';

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/dashboard/hr/staff", icon: Users },
  { label: "Contracts", href: "/dashboard/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/dashboard/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/dashboard/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
  { label: "Departments", href: "/dashboard/hr/departments", icon: Briefcase },
];

const mockPayroll = [
  { id: 1, employee: 'Ahmed Hassan', position: 'Senior Lecturer', salary: '$5,500', tax: '$825', net: '$4,675', payDate: '2024-02-15', status: 'Processed' },
  { id: 2, employee: 'Fatima Ali', position: 'Lecturer', salary: '$4,200', tax: '$630', net: '$3,570', payDate: '2024-02-15', status: 'Processed' },
  { id: 3, employee: 'Mohamed Ibrahim', position: 'Assistant Professor', salary: '$4,800', tax: '$720', net: '$4,080', payDate: '2024-02-15', status: 'Processed' },
  { id: 4, employee: 'Amina Karim', position: 'Senior Admin', salary: '$3,500', tax: '$525', net: '$2,975', payDate: '2024-02-15', status: 'Pending' },
];

const payrollSummary = [
  { month: 'February 2024', totalSalaries: '$45,000', totalDeductions: '$6,750', totalNet: '$38,250' },
  { month: 'January 2024', totalSalaries: '$45,000', totalDeductions: '$6,750', totalNet: '$38,250' },
  { month: 'December 2023', totalSalaries: '$45,000', totalDeductions: '$6,750', totalNet: '$38,250' },
];

export default function PayrollPage() {
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Payroll Management</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Process Payroll
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Total Payroll</p>
                <p className="text-3xl font-bold">$45K</p>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Total Deductions</p>
                <p className="text-3xl font-bold">$6.7K</p>
                <p className="text-xs text-muted-foreground mt-2">Tax & Benefits</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Net Payroll</p>
                <p className="text-3xl font-bold">$38.2K</p>
                <p className="text-xs text-muted-foreground mt-2">To Employees</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Employees</p>
                <p className="text-3xl font-bold">{mockPayroll.length}</p>
                <p className="text-xs text-muted-foreground mt-2">On payroll</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Payroll */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Current Payroll - February 2024</CardTitle>
                  <CardDescription>Employee salary breakdown and deductions</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Employee</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Position</th>
                      <th className="text-right py-3 px-6 font-medium text-muted-foreground">Gross Salary</th>
                      <th className="text-right py-3 px-6 font-medium text-muted-foreground">Deductions</th>
                      <th className="text-right py-3 px-6 font-medium text-muted-foreground">Net Salary</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayroll.map(item => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-6 font-medium text-foreground">{item.employee}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{item.position}</td>
                        <td className="py-4 px-6 text-right font-medium">{item.salary}</td>
                        <td className="py-4 px-6 text-right text-red-600">{item.tax}</td>
                        <td className="py-4 px-6 text-right font-bold text-green-600">{item.net}</td>
                        <td className="py-4 px-6">
                          <Badge className={item.status === 'Processed' ? 'bg-green-500/10 text-green-700 border-green-500/20 border' : 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 border'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Payroll History */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>Previous payroll cycles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {payrollSummary.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30">
                  <div>
                    <p className="font-semibold text-foreground">{item.month}</p>
                    <div className="grid grid-cols-3 gap-6 text-sm mt-2">
                      <div>
                        <p className="text-muted-foreground">Total Salaries</p>
                        <p className="font-medium text-foreground">{item.totalSalaries}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deductions</p>
                        <p className="font-medium text-red-600">{item.totalDeductions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Payroll</p>
                        <p className="font-medium text-green-600">{item.totalNet}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      
  );
}
