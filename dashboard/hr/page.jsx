import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  UserPlus,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/dashboard/hr/staff", icon: Users },
  { label: "Contracts", href: "/dashboard/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/dashboard/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/dashboard/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
  { label: "Departments", href: "/dashboard/hr/departments", icon: Briefcase },
]

const leaveRequests = [
  { name: "Dr. Emily Chen", type: "Annual Leave", dates: "Jan 20-24", status: "pending" },
  { name: "Prof. David Lee", type: "Sick Leave", dates: "Jan 18", status: "approved" },
  { name: "Sarah Wilson", type: "Personal Leave", dates: "Jan 22-23", status: "pending" },
  { name: "James Brown", type: "Conference", dates: "Feb 1-3", status: "approved" },
]

const recentHires = [
  { name: "Dr. Maria Garcia", position: "Assistant Professor", department: "Physics", startDate: "Jan 15, 2026" },
  { name: "John Smith", position: "Lab Technician", department: "Chemistry", startDate: "Jan 10, 2026" },
  { name: "Lisa Wang", position: "Admin Assistant", department: "Engineering", startDate: "Jan 8, 2026" },
]

const contractsExpiring = [
  { name: "Prof. Robert Taylor", type: "Full-time", expires: "Feb 28, 2026" },
  { name: "Dr. Amanda White", type: "Part-time", expires: "Mar 15, 2026" },
  { name: "Michael Johnson", type: "Contract", expires: "Jan 31, 2026" },
]

export default function HRDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="HR Portal" subtitle="Human Resources" />

      <div className="ml-64">
        <DashboardHeader userName="Patricia Moore" userRole="HR Manager" />

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Employees" value="1,847" change="12" changeType="positive" icon={Users} />
            <StatCard title="Open Positions" value="23" icon={Briefcase} />
            <StatCard title="Pending Requests" value="8" icon={Clock} />
            <StatCard title="Contracts Expiring" value="15" icon={FileText} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Leave Requests */}
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Pending approval</CardDescription>
                </div>
                <Button size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{request.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.type} | {request.dates}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Badge variant="outline" className="text-green-600">
                            Approved
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contracts Expiring */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Contracts Expiring Soon
                </CardTitle>
                <CardDescription>Requires attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractsExpiring.map((contract, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{contract.name}</p>
                        <p className="text-sm text-muted-foreground">{contract.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-yellow-600">Expires</p>
                        <p className="text-sm text-muted-foreground">{contract.expires}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Manage Contracts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Hires */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Hires</CardTitle>
                <CardDescription>New employees this month</CardDescription>
              </div>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {recentHires.map((hire, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{hire.name}</p>
                        <p className="text-sm text-muted-foreground">{hire.position}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Department: {hire.department}</p>
                      <p className="text-muted-foreground">Start Date: {hire.startDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col gap-2">
              <UserPlus className="w-6 h-6" />
              <span>Add Employee</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              <span>Create Contract</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span>Manage Leave</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Briefcase className="w-6 h-6" />
              <span>Post Job</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
