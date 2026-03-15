'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
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

const staffData = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    position: "Associate Professor",
    department: "Computer Science",
    email: "emily.chen@university.edu",
    phone: "+1 (555) 123-4567",
    joinDate: "Jan 15, 2020",
    status: "Active",
    qualifications: "PhD in Computer Science",
  },
  {
    id: 2,
    name: "Prof. David Lee",
    position: "Professor",
    department: "Mathematics",
    email: "david.lee@university.edu",
    phone: "+1 (555) 234-5678",
    joinDate: "Aug 10, 2015",
    status: "Active",
    qualifications: "PhD in Mathematics",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    position: "Lecturer",
    department: "Physics",
    email: "sarah.wilson@university.edu",
    phone: "+1 (555) 345-6789",
    joinDate: "Feb 01, 2022",
    status: "Active",
    qualifications: "Masters in Physics",
  },
  {
    id: 4,
    name: "James Brown",
    position: "Research Fellow",
    department: "Biology",
    email: "james.brown@university.edu",
    phone: "+1 (555) 456-7890",
    joinDate: "Sep 12, 2021",
    status: "On Leave",
    qualifications: "PhD in Biology",
  },
  {
    id: 5,
    name: "Maria Garcia",
    position: "Teaching Assistant",
    department: "Engineering",
    email: "maria.garcia@university.edu",
    phone: "+1 (555) 567-8901",
    joinDate: "Jan 08, 2026",
    status: "Active",
    qualifications: "Bachelors in Engineering",
  },
];

export default function StaffProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || staff.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...new Set(staffData.map(s => s.department))];

  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Staff Profiles</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Staff Member
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background cursor-pointer"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Staff Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStaff.map(staff => (
              <Card key={staff.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{staff.position}</p>
                    </div>
                  </div>
                  <Badge variant={staff.status === 'Active' ? 'default' : 'secondary'}>
                    {staff.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{staff.department}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Join Date</p>
                      <p className="font-medium text-foreground">{staff.joinDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground text-xs break-all">{staff.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Qualifications</p>
                      <p className="font-medium text-foreground">{staff.qualifications}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No staff members found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </main>
   
  );
}