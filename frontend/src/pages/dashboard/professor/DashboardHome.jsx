
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ClipboardCheck,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  Clock,
  AlertCircle,
} from "lucide-react"



const myCourses = [
  { code: "CS101", name: "Introduction to Programming", students: 120, nextClass: "Today, 10:00 AM" },
  { code: "CS301", name: "Algorithms", students: 72, nextClass: "Today, 2:00 PM" },
  { code: "CS501", name: "Advanced ML", students: 35, nextClass: "Tomorrow, 9:00 AM" },
]

const pendingTasks = [
  { task: "Grade midterm exams - CS101", due: "Today", priority: "high" },
  { task: "Upload lecture slides - CS301", due: "Tomorrow", priority: "medium" },
  { task: "Submit attendance - CS501", due: "In 2 days", priority: "low" },
]

const upcomingClasses = [
  { course: "CS101", topic: "Functions and Loops", time: "10:00 AM", room: "Hall A-201" },
  { course: "CS301", topic: "Graph Algorithms", time: "2:00 PM", room: "Lab B-105" },
  { course: "CS101", topic: "Arrays and Lists", time: "10:00 AM", room: "Hall A-201" },
]


export default function DashboardHome() {
  return (
   <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="My Courses" value="3" icon={BookOpen} />
            <StatCard title="Total Students" value="227" icon={GraduationCap} />
            <StatCard title="Classes This Week" value="12" icon={Calendar} />
            <StatCard title="Pending Grades" value="45" icon={ClipboardCheck} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* My Courses */}
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Current semester assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{course.code}</p>
                          <p className="text-sm text-muted-foreground">{course.name}</p>
                          <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Next Class</p>
                        <p className="text-sm text-muted-foreground">{course.nextClass}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Action items requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      {task.priority === "high" ? (
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{task.task}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Your upcoming classes</CardDescription>
              </div>
              <Button variant="outline">View Full Schedule</Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{classItem.course}</Badge>
                      <span className="text-sm text-muted-foreground">{classItem.time}</span>
                    </div>
                    <p className="font-medium text-foreground mb-1">{classItem.topic}</p>
                    <p className="text-sm text-muted-foreground">{classItem.room}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col gap-2">
              <ClipboardCheck className="w-6 h-6" />
              <span>Submit Grades</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Users className="w-6 h-6" />
              <span>Take Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              <span>Upload Materials</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span>Schedule Office Hours</span>
            </Button>
          </div>
        </main>
  )
}