import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Outlet } from "react-router-dom"

import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Clock,
  Users,
  Calendar,
  FileText,
  
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/department", icon: LayoutDashboard },
  { label: "Courses", href: "/department/courses", icon: BookOpen },
  { label: "Course Offering", href: "/department/CourseOffering", icon: Users },
  { label: "Analytics", href: "/department/analytics", icon: BarChart3 },
  { label: "student", href: "/department/student", icon: Users },
  { label: "Reports", href: "/department/reports", icon: FileText },
]


export default function DepartmentLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Department Head" subtitle="Computer Science" />

      <div className="ml-64">
        <DashboardHeader userName="Dr. Jennifer Adams" userRole="Department Head" />

        <Outlet/>
      </div>
    </div>
  )
}
