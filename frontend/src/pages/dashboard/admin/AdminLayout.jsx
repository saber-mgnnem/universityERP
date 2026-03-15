
import { Outlet } from "react-router-dom"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  Database,
  FileText,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Security", href: "/admin/security", icon: Shield },
  { label: "Database", href: "/admin/database", icon: Database },
  { label: "Logs", href: "/admin/logs", icon: FileText },
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