import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  DollarSign,
  TrendingUp,
  FileText,
  Receipt,
  AlertCircle,
  Clock,
} from "lucide-react"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/finance", icon: LayoutDashboard },
  { label: "Payments", href: "/dashboard/finance/payments", icon: CreditCard },
  { label: "Budget Reports", href: "/dashboard/finance/budget", icon: PieChart },
  { label: "Revenue", href: "/dashboard/finance/revenue", icon: DollarSign },
  { label: "Expenses", href: "/dashboard/finance/expenses", icon: Receipt },
  { label: "Invoices", href: "/dashboard/finance/invoices", icon: FileText },
]

const recentTransactions = [
  { type: "income", desc: "Tuition Payment - Alex Thompson", amount: "+$12,500", date: "Today" },
  { type: "expense", desc: "Lab Equipment Purchase", amount: "-$8,450", date: "Yesterday" },
  { type: "income", desc: "Research Grant - NSF", amount: "+$250,000", date: "Jan 14" },
  { type: "expense", desc: "Faculty Salaries - January", amount: "-$1,245,000", date: "Jan 13" },
  { type: "income", desc: "Tuition Payment - Maria Santos", amount: "+$12,500", date: "Jan 12" },
]

const budgetAllocation = [
  { category: "Faculty Salaries", allocated: 45000000, spent: 37500000, percentage: 83 },
  { category: "Research & Development", allocated: 12000000, spent: 8400000, percentage: 70 },
  { category: "Infrastructure", allocated: 8000000, spent: 6200000, percentage: 78 },
  { category: "Student Services", allocated: 5000000, spent: 3800000, percentage: 76 },
]

const pendingPayments = [
  { student: "John Martinez", amount: "$12,500", due: "Jan 20", status: "overdue" },
  { student: "Sarah Williams", amount: "$6,250", due: "Jan 25", status: "pending" },
  { student: "Michael Chen", amount: "$12,500", due: "Jan 28", status: "pending" },
]

export function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} title="Finance Portal" subtitle="Financial Management" />
      <div className="ml-64">
        <DashboardHeader userName="Richard Anderson" userRole="Finance Manager" />
        <main className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="$24.5M" change="12%" changeType="positive" icon={DollarSign} />
            <StatCard title="Total Expenses" value="$18.2M" change="8%" changeType="positive" icon={Receipt} />
            <StatCard title="Net Income" value="$6.3M" change="18%" changeType="positive" icon={TrendingUp} />
            <StatCard title="Pending Payments" value="$1.2M" icon={Clock} />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial activities</CardDescription>
                </div>
                <Button size="sm" variant="outline">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "income" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <Receipt className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.desc}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Pending Payments
                </CardTitle>
                <CardDescription>Awaiting collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPayments.map((payment, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{payment.student}</p>
                        <Badge variant={payment.status === "overdue" ? "destructive" : "outline"}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Due: {payment.due}</span>
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">Send Reminders</Button>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Current fiscal year spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetAllocation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ${(item.spent / 1000000).toFixed(1)}M / ${(item.allocated / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          item.percentage > 90 ? "bg-red-500" : item.percentage > 75 ? "bg-yellow-500" : "bg-primary"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid sm:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col gap-2">
              <CreditCard className="w-6 h-6" />
              <span>Process Payment</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              <span>Generate Invoice</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <PieChart className="w-6 h-6" />
              <span>Budget Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
              <Receipt className="w-6 h-6" />
              <span>Expense Report</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
