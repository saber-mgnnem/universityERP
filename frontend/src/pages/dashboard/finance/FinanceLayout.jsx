import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Outlet } from "react-router-dom"
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  DollarSign,
  FileText,
  Receipt,

} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/finance/dashboard", icon: LayoutDashboard },
  { label: "Payments", href: "/finance/payments", icon: CreditCard },
  { label: "Budget Reports", href: "/finance/budget", icon: PieChart },
  { label: "Revenue", href: "/finance/revenue", icon: DollarSign },
  { label: "Expenses", href: "/finance/expenses", icon: Receipt },
  { label: "Invoices", href: "/finance/invoices", icon: FileText },
]


export default function FinanceLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Finance Portal" subtitle="Financial Management" />

      <div className="ml-64">
        <DashboardHeader userName="Richard Anderson" userRole="Finance Manager" />

        <Outlet/>
      </div>
    </div>
  )
}
