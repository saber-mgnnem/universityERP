
import { Outlet } from "react-router-dom"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  UserPlus,
  Calendar,
  DollarSign,
  Building2
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Departments", href: "/admin/departments", icon: Building2 },
  { label: "Performance Reports", href: "/rector/reports", icon: FileText },
  { label: "Budget Overview", href: "/rector/budget", icon: DollarSign },
  { label: "Attendance", href: "/professor/attendance", icon: Users },
  { label: "Leave Management", href: "/professor/leave", icon: Calendar },
  { label: "Contracts", href: "/hr/contracts", icon: FileText },
  { label: "Recruitment", href: "/hr/recruitment", icon: UserPlus },

]

export default function AdminLayout() {
  return (
 <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Admin Portal" subtitle="System Administrator" />
      <div className="ml-64">
        <DashboardHeader userName="John Admin" userRole="System Administrator" />
        <Outlet />

      </div>
    </div>
  )
}