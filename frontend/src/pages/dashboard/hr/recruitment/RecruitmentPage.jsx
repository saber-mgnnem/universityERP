'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Users as UsersIcon } from 'lucide-react';
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

const jobPostings = [
  {
    id: 1,
    title: "Assistant Professor - Computer Science",
    department: "Computer Science",
    level: "Entry",
    applicants: 24,
    postedDate: "Jan 10, 2026",
    status: "Open",
    salary: "$70,000 - $90,000",
  },
  {
    id: 2,
    title: "Research Associate",
    department: "Research",
    level: "Mid",
    applicants: 18,
    postedDate: "Jan 05, 2026",
    status: "Open",
    salary: "$50,000 - $65,000",
  },
  {
    id: 3,
    title: "Lab Technician",
    department: "Engineering",
    level: "Entry",
    applicants: 12,
    postedDate: "Dec 28, 2025",
    status: "Closed",
    salary: "$35,000 - $45,000",
  },
  {
    id: 4,
    title: "Senior Professor - Physics",
    department: "Physics",
    level: "Senior",
    applicants: 8,
    postedDate: "Dec 15, 2025",
    status: "On Hold",
    salary: "$100,000 - $130,000",
  },
];

const applications = [
  { id: 1, candidate: "John Smith", position: "Assistant Professor", appliedDate: "Feb 05, 2026", status: "Under Review", experience: "3 years" },
  { id: 2, candidate: "Sarah Johnson", position: "Assistant Professor", appliedDate: "Feb 03, 2026", status: "Interview", experience: "5 years" },
  { id: 3, candidate: "Mike Davis", position: "Lecturer", appliedDate: "Feb 01, 2026", status: "Offered", experience: "4 years" },
  { id: 4, candidate: "Emma Wilson", position: "Lab Technician", appliedDate: "Jan 25, 2026", status: "Rejected", experience: "2 years" },
];

export default function RecruitmentPage() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPostings = jobPostings.filter(job => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'Closed': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'On Hold': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    }
  };

  const getAppStatusColor = (status) => {
    switch(status) {
      case 'Offered': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'Interview': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Under Review': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Recruitment Management</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Post New Job
            </Button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Active Positions</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-foreground">{applications.length}</p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-foreground">{applications.filter(a => a.status === 'Interview').length}</p>
                <p className="text-sm text-muted-foreground">In Interview</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-foreground">{applications.filter(a => a.status === 'Offered').length}</p>
                <p className="text-sm text-muted-foreground">Offers Made</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {['All', 'Open', 'On Hold', 'Closed'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Job Postings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage all active job postings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredPostings.map(job => (
                <div key={job.id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/30">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{job.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Level</p>
                        <p className="font-medium">{job.level}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Applicants</p>
                        <p className="font-medium flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          {job.applicants}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge className={`${getStatusColor(job.status)} border mt-1`}>{job.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Applications */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Review submitted applications</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Candidate</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Position</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Experience</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Applied Date</th>
                      <th className="text-left py-3 px-6 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-6 font-medium text-foreground">{app.candidate}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{app.position}</td>
                        <td className="py-4 px-6 text-sm">{app.experience}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{app.appliedDate}</td>
                        <td className="py-4 px-6">
                          <Badge className={`${getAppStatusColor(app.status)} border`}>{app.status}</Badge>
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