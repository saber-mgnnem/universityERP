'use client';

import { useState } from 'react';
import { Plus, Check, X, Clock } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Users, FileText, Calendar, UserPlus, Briefcase } from 'lucide-react';

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/dashboard/hr/staff", icon: Users },
  { label: "Contracts", href: "/dashboard/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/dashboard/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/dashboard/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
  { label: "Departments", href: "/dashboard/hr/departments", icon: Briefcase },
];

const leaveRequests = [
  {
    id: 1,
    employeeName: "Dr. Emily Chen",
    type: "Annual Leave",
    startDate: "Jan 20, 2026",
    endDate: "Jan 24, 2026",
    days: 5,
    reason: "Vacation",
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Prof. David Lee",
    type: "Sick Leave",
    startDate: "Jan 18, 2026",
    endDate: "Jan 18, 2026",
    days: 1,
    reason: "Medical appointment",
    status: "Approved",
  },
  {
    id: 3,
    employeeName: "Sarah Wilson",
    type: "Personal Leave",
    startDate: "Jan 22, 2026",
    endDate: "Jan 23, 2026",
    days: 2,
    reason: "Family matters",
    status: "Pending",
  },
  {
    id: 4,
    employeeName: "James Brown",
    type: "Conference",
    startDate: "Feb 01, 2026",
    endDate: "Feb 03, 2026",
    days: 3,
    reason: "Academic conference",
    status: "Approved",
  },
  {
    id: 5,
    employeeName: "Maria Garcia",
    type: "Maternity Leave",
    startDate: "Mar 01, 2026",
    endDate: "Jun 01, 2026",
    days: 92,
    reason: "Maternity",
    status: "Pending",
  },
];

export default function LeaveManagementPage() {
  const [requests, setRequests] = useState(leaveRequests);
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRequests = requests.filter(req => {
    if (filterStatus === 'All') return true;
    return req.status === filterStatus;
  });

  const handleApprove = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <Check className="w-4 h-4 text-green-600" />;
      case 'Rejected': return <X className="w-4 h-4 text-red-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Leave Request
            </Button>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Leave Requests */}
          <div className="space-y-4">
            {filteredRequests.map(request => (
              <Card key={request.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{request.employeeName}</h3>
                        <Badge variant="outline">{request.type}</Badge>
                        <Badge className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Period</p>
                          <p className="font-medium text-foreground">{request.startDate} to {request.endDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium text-foreground">{request.days} days</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Reason</p>
                          <p className="font-medium text-foreground">{request.reason}</p>
                        </div>
                      </div>
                    </div>

                    {request.status === 'Pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
     
  );
}
