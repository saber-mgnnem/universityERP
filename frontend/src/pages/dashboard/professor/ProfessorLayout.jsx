import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Users,
  Calendar,
  FileText,

} from "lucide-react"
import { Outlet } from "react-router-dom"

const sidebarItems = [
  { label: "Dashboard", href: "/professor/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/professor/courses", icon: BookOpen },
  { label: "Grade Submission", href: "/professor/grades", icon: ClipboardCheck },
  { label: "Attendance", href: "/professor/attendance", icon: Users },
  { label: "Schedule", href: "/professor/schedule", icon: Calendar },
  { label: "Materials", href: "/professor/materials", icon: FileText },
]

export default function ProfessorLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Professor Portal" subtitle="Faculty Dashboard" />

      <div className="ml-64">
        <DashboardHeader userName="Prof. Michael Brown" userRole="Professor" />

               <Outlet />
      </div>
    </div>
  )
}
