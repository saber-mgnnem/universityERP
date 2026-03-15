import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Outlet } from "react-router-dom"

import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  UserPlus,
  Clock,
  Briefcase,
  DollarSign,

} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/hr/dashboard", icon: LayoutDashboard },
  { label: "Staff Profiles", href: "/hr/staff", icon: Users },
  { label: "Contracts", href: "/hr/contracts", icon: FileText },
  { label: "Leave Management", href: "/hr/leave", icon: Calendar },
  { label: "Recruitment", href: "/hr/recruitment", icon: UserPlus },
  { label: "Attendance", href: "/hr/attendance", icon: Clock },
  { label: "Departments", href: "/hr/departments", icon: Briefcase },
  { label: "Payroll", href: "/hr/payroll", icon: DollarSign },

]


export default function HRLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="HR Portal" subtitle="Human Resources" />

      <div className="ml-64">
        <DashboardHeader userName="Patricia Moore" userRole="HR Manager" />

       <Outlet/>
      </div>
    </div>
  )
}
