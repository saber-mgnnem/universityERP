import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Outlet } from "react-router-dom"

import {
  LayoutDashboard,
  BarChart3,
  Brain,
  FileText,
  Building2,
  DollarSign,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/rector/dashboard", icon: LayoutDashboard },
  { label: "Strategic Analytics", href: "/rector/analytics", icon: BarChart3 },
  { label: "AI Predictions", href: "/rector/predictions", icon: Brain },
  { label: "Performance Reports", href: "/rector/reports", icon: FileText },
  { label: "Departments", href: "/rector/departments", icon: Building2 },
  { label: "Budget Overview", href: "/rector/budget", icon: DollarSign },
]

export default function RectorLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Rector Portal" subtitle="Strategic Overview" />

      <div className="ml-64">
        <DashboardHeader userName="Dr. Robert Wilson" userRole="University Rector" />
        <Outlet />

      
      </div>
    </div>
  )
}
