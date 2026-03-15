import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Clock,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  Plus,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/department", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/department/courses", icon: BookOpen },
  { label: "Faculty", href: "/dashboard/department/faculty", icon: Users },
  { label: "Analytics", href: "/dashboard/department/analytics", icon: BarChart3 },
  { label: "Workload", href: "/dashboard/department/workload", icon: Clock },
  { label: "Schedule", href: "/dashboard/department/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/department/reports", icon: FileText },
]

const facultyWorkload = [
  { name: "Dr. Emily Chen", courses: 3, hours: 18, status: "optimal" },
  { name: "Prof. Michael Brown", courses: 4, hours: 22, status: "high" },
  { name: "Dr. Sarah Johnson", courses: 2, hours: 12, status: "low" },
  { name: "Prof. David Lee", courses: 3, hours: 16, status: "optimal" },
]

const departmentCourses = [
  { code: "CS101", name: "Introduction to Programming", enrolled: 120, capacity: 150 },
  { code: "CS201", name: "Data Structures", enrolled: 85, capacity: 100 },
  { code: "CS301", name: "Algorithms", enrolled: 72, capacity: 80 },
  { code: "CS401", name: "Machine Learning", enrolled: 60, capacity: 60 },
]

export function DepartmentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Department Head" subtitle="Computer Science" />
      <div className="ml-64">
        <DashboardHeader userName="Dr. Jennifer Adams" userRole="Department Head" />
        <main className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Students" value="1,240" change="5%" changeType="positive" icon={GraduationCap} />
            <StatCard title="Faculty Members" value="24" icon={Users} />
            <StatCard title="Active Courses" value="18" icon={BookOpen} />
            <StatCard title="Avg. Class Size" value="68" change="2%" changeType="positive" icon={BarChart3} />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Faculty Workload</CardTitle>
                  <CardDescription>Current semester assignments</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Assign Course
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyWorkload.map((faculty, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{faculty.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {faculty.courses} courses | {faculty.hours} hrs/week
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          faculty.status === "optimal"
                            ? "default"
                            : faculty.status === "high"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {faculty.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Course Enrollment</CardTitle>
                  <CardDescription>Current semester courses</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentCourses.map((course, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{course.code}</p>
                          <p className="text-sm text-muted-foreground">{course.name}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.enrolled}/{course.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            course.enrolled / course.capacity > 0.9 ? "bg-yellow-500" : "bg-primary"
                          }`}
                          style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Key metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Department Analytics</p>
                  <p className="text-sm text-muted-foreground">Enrollment trends, graduation rates, research output</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
