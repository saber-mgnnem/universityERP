import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Shield, Database, AlertTriangle,  FileText, Settings,UserPlus, } from "lucide-react"
import { Button } from "@/components/ui/button"


const recentActivities = [
  { user: "Dr. Smith", action: "Created new course", time: "2 min ago" },
  { user: "Admin", action: "Updated system settings", time: "15 min ago" },
  { user: "Jane Doe", action: "Enrolled in CS101", time: "1 hour ago" },
  { user: "Prof. Johnson", action: "Submitted grades", time: "2 hours ago" },
]

export default function DashboardHome() {
  return (
   <main className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="12,847" change="12%" changeType="positive" icon={Users} />
            <StatCard title="Active Sessions" value="1,234" change="5%" changeType="positive" icon={Activity} />
            <StatCard title="System Health" value="99.9%" icon={Shield} />
            <StatCard title="Storage Used" value="78%" icon={Database} />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system-wide activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <UserPlus className="w-4 h-4" />
                  Add New User
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Settings className="w-4 h-4" />
                  System Configuration
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Database className="w-4 h-4" />
                  Backup Database
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div>
                    <p className="font-medium text-foreground">Database maintenance scheduled</p>
                    <p className="text-sm text-muted-foreground">Scheduled for Sunday, 2:00 AM - 4:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div>
                    <p className="font-medium text-foreground">New update available</p>
                    <p className="text-sm text-muted-foreground">Version 2.5.0 is ready to install</p>
                  </div>
                  <Button size="sm">Update Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
  )
}