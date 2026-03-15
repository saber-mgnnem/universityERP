import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LayoutDashboard,
  BarChart3,
  Brain,
  FileText,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Building2,
  DollarSign,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/rector", icon: LayoutDashboard },
  { label: "Strategic Analytics", href: "/dashboard/rector/analytics", icon: BarChart3 },
  { label: "AI Predictions", href: "/dashboard/rector/predictions", icon: Brain },
  { label: "Performance Reports", href: "/dashboard/rector/reports", icon: FileText },
  { label: "Departments", href: "/dashboard/rector/departments", icon: Building2 },
  { label: "Budget Overview", href: "/dashboard/rector/budget", icon: DollarSign },
]

const departmentPerformance = [
  { name: "Computer Science", students: 1240, growth: "+12%", satisfaction: "94%" },
  { name: "Engineering", students: 890, growth: "+8%", satisfaction: "91%" },
  { name: "Business", students: 1560, growth: "+15%", satisfaction: "89%" },
  { name: "Medicine", students: 420, growth: "+5%", satisfaction: "96%" },
  { name: "Arts & Humanities", students: 680, growth: "+3%", satisfaction: "88%" },
]

export default function RectorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Rector Portal" subtitle="Strategic Overview" />

      <div className="ml-64">
        <DashboardHeader userName="Dr. Robert Wilson" userRole="University Rector" />

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Students" value="24,580" change="8%" changeType="positive" icon={GraduationCap} />
            <StatCard title="Faculty Members" value="1,847" change="3%" changeType="positive" icon={Users} />
            <StatCard title="Graduation Rate" value="94.2%" change="2.1%" changeType="positive" icon={Award} />
            <StatCard title="Research Grants" value="$12.5M" change="18%" changeType="positive" icon={TrendingUp} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Predictions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Predictions
                </CardTitle>
                <CardDescription>Machine learning insights for next semester</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Enrollment Forecast</span>
                    <span className="text-sm text-primary">+12% projected</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Expected 27,500 students for Fall 2026</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Retention Risk</span>
                    <span className="text-sm text-yellow-600">Medium</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">847 students flagged for early intervention</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Budget Utilization</span>
                    <span className="text-sm text-green-600">On Track</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">65% of annual budget utilized through Q3</p>
                </div>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Key metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">{dept.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">{dept.growth}</p>
                        <p className="text-xs text-muted-foreground">{dept.satisfaction} satisfaction</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Metrics Chart Placeholder */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Strategic Performance Overview</CardTitle>
              <CardDescription>Year-over-year institutional metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Analytics Dashboard</p>
                  <p className="text-sm text-muted-foreground">Enrollment, Revenue, and Performance Trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
