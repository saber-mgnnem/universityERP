'use client';

import { Plus, Edit2, Trash2, Users, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users as UsersIcon, FileText, Calendar, UserPlus, Clock, Briefcase } from 'lucide-react';

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/dashboard/hr/staff", icon: UsersIcon },
  { label: "Contracts", href: "/dashboard/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/dashboard/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/dashboard/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
  { label: "Departments", href: "/dashboard/hr/departments", icon: Briefcase },
];

const departmentsData = [
  {
    id: 1,
    name: "Computer Science",
    head: "Dr. Emily Chen",
    employees: 24,
    budget: "$580,000",
    courses: 18,
    students: 342,
    growth: 12,
  },
  {
    id: 2,
    name: "Mathematics",
    head: "Prof. David Lee",
    employees: 18,
    budget: "$420,000",
    courses: 14,
    students: 278,
    growth: 8,
  },
  {
    id: 3,
    name: "Physics",
    head: "Sarah Wilson",
    employees: 22,
    budget: "$510,000",
    courses: 16,
    students: 312,
    growth: 15,
  },
  {
    id: 4,
    name: "Biology",
    head: "James Brown",
    employees: 20,
    budget: "$480,000",
    courses: 15,
    students: 298,
    growth: 6,
  },
  {
    id: 5,
    name: "Engineering",
    head: "Dr. Michael Johnson",
    employees: 28,
    budget: "$650,000",
    courses: 20,
    students: 385,
    growth: 18,
  },
];

export default function DepartmentsPage() {
  return (

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Department Management</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Department
            </Button>
          </div>

          {/* Departments Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {departmentsData.map(dept => (
              <Card key={dept.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{dept.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold text-foreground">{dept.employees}</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        Staff
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold text-foreground">{dept.courses}</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold text-foreground">{dept.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-bold text-foreground">{dept.budget}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">+{dept.growth}%</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      
  );
}
