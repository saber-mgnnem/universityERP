import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileCheck,
  BarChart3,
  Calendar,
  Brain,
  BookOpen,
  Clock,
  CreditCard,
  TrendingUp,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "Enrollment", href: "/dashboard/student/enrollment", icon: FileCheck },
  { label: "My Grades", href: "/dashboard/student/grades", icon: BarChart3 },
  { label: "Timetable", href: "/dashboard/student/timetable", icon: Calendar },
  { label: "AI Advisor", href: "/dashboard/student/advisor", icon: Brain },
  { label: "Courses", href: "/dashboard/student/courses", icon: BookOpen },
  { label: "Payments", href: "/dashboard/student/payments", icon: CreditCard },
]

const currentCourses = [
  { code: "CS101", name: "Introduction to Programming", grade: "A", progress: 85 },
  { code: "MATH201", name: "Linear Algebra", grade: "B+", progress: 72 },
  { code: "PHYS101", name: "Physics I", grade: "A-", progress: 78 },
  { code: "ENG102", name: "Technical Writing", grade: "B", progress: 65 },
]

const todaySchedule = [
  { time: "9:00 AM", course: "CS101", topic: "Functions and Loops", room: "Hall A-201" },
  { time: "11:00 AM", course: "MATH201", topic: "Eigenvalues", room: "Room B-102" },
  { time: "2:00 PM", course: "PHYS101", topic: "Newton's Laws", room: "Lab C-301" },
]

const aiRecommendations = [
  { type: "course", text: "Consider taking CS201 next semester to build on your programming skills" },
  { type: "study", text: "You might benefit from additional practice in Linear Algebra - Chapter 5" },
  { type: "career", text: "Based on your interests, explore Data Science career paths" },
]

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Student Portal" subtitle="Academic Dashboard" />
      <div className="ml-64">
        <DashboardHeader userName="Alex Thompson" userRole="Computer Science - Year 2" />
        <main className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Current GPA" value="3.65" change="0.12" changeType="positive" icon={TrendingUp} />
            <StatCard title="Credits Earned" value="45" icon={BookOpen} />
            <StatCard title="Courses This Sem" value="4" icon={Calendar} />
            <StatCard title="Assignments Due" value="3" icon={Clock} />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle>Current Courses</CardTitle>
                <CardDescription>Your enrolled courses this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCourses.map((course, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{course.code}</span>
                            <Badge variant="outline">{course.grade}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{course.name}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Advisor
                </CardTitle>
                <CardDescription>Personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <Badge variant="outline" className="mb-2">{rec.type}</Badge>
                      <p className="text-sm text-foreground">{rec.text}</p>
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline">Chat with AI Advisor</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </div>
              <Button variant="outline">View Full Timetable</Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {todaySchedule.map((classItem, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{classItem.course}</Badge>
                      <span className="text-sm font-medium text-foreground">{classItem.time}</span>
                    </div>
                    <p className="font-medium text-foreground mb-1">{classItem.topic}</p>
                    <p className="text-sm text-muted-foreground">{classItem.room}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid sm:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col gap-2">
              <FileCheck className="w-6 h-6" />
              <span>Enroll in Course</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <BarChart3 className="w-6 h-6" />
              <span>View Grades</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <CreditCard className="w-6 h-6" />
              <span>Pay Tuition</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span>Academic Calendar</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
