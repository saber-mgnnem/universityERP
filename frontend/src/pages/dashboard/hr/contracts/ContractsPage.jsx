'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, AlertCircle } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
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

const contractsData = [
  {
    id: 1,
    employeeName: "Prof. Robert Taylor",
    type: "Full-time",
    department: "Engineering",
    position: "Senior Professor",
    startDate: "Jan 15, 2020",
    endDate: "Feb 28, 2026",
    salary: "$120,000",
    status: "Expiring Soon",
    daysUntilExpiry: 44,
  },
  {
    id: 2,
    employeeName: "Dr. Amanda White",
    type: "Part-time",
    department: "Research",
    position: "Research Associate",
    startDate: "Mar 10, 2021",
    endDate: "Mar 15, 2026",
    salary: "$65,000",
    status: "Active",
    daysUntilExpiry: 59,
  },
  {
    id: 3,
    employeeName: "Michael Johnson",
    type: "Contract",
    department: "IT",
    position: "System Administrator",
    startDate: "Sep 01, 2022",
    endDate: "Jan 31, 2026",
    salary: "$55,000",
    status: "Expiring Soon",
    daysUntilExpiry: 16,
  },
  {
    id: 4,
    employeeName: "Lisa Anderson",
    type: "Full-time",
    department: "Administration",
    position: "Administrative Manager",
    startDate: "Jun 15, 2019",
    endDate: "Jun 15, 2026",
    salary: "$70,000",
    status: "Active",
    daysUntilExpiry: 122,
  },
  {
    id: 5,
    employeeName: "Dr. James Wilson",
    type: "Full-time",
    department: "Sciences",
    position: "Professor",
    startDate: "Jan 01, 2018",
    endDate: "Dec 31, 2025",
    salary: "$110,000",
    status: "Expired",
    daysUntilExpiry: -44,
  },
];

export default function ContractsPage() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredContracts = contractsData.filter(contract => {
    if (filterStatus === 'All') return true;
    return contract.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Expiring Soon': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'Expired': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'Active': return 'bg-green-500/10 text-green-700 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  return (
    
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Employment Contracts</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Contract
            </Button>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {['All', 'Active', 'Expiring Soon', 'Expired'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Contracts Table */}
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Active Contracts</CardTitle>
              <CardDescription>Manage all employee contracts</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Employee</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Department</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">End Date</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.map(contract => (
                      <tr key={contract.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-foreground">{contract.employeeName}</p>
                            <p className="text-sm text-muted-foreground">{contract.position}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">{contract.type}</td>
                        <td className="py-4 px-6 text-sm">{contract.department}</td>
                        <td className="py-4 px-6 text-sm">{contract.endDate}</td>
                        <td className="py-4 px-6">
                          <Badge className={`${getStatusColor(contract.status)} border`}>
                            {contract.status === 'Expiring Soon' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {contract.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
