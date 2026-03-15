import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Outlet } from "react-router-dom"

import {
  LayoutDashboard,
  FileCheck,
  BarChart3,
  Calendar,
  Brain,
  BookOpen,
  CreditCard,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Enrollment", href: "/student/enrollment", icon: FileCheck },
  { label: "My Grades", href: "/student/grades", icon: BarChart3 },
  { label: "Timetable", href: "/student/timetable", icon: Calendar },
  { label: "AI Advisor", href: "/student/advisor", icon: Brain },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
]

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Student Portal" subtitle="Academic Dashboard" />

      <div className="ml-64">
        <DashboardHeader userName="Alex Thompson" userRole="Computer Science - Year 2" />
        <Outlet />

        
      </div>
    </div>
  )
}
