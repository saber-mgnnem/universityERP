"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Award,
  Building2,
  BookOpen,
  GraduationCap,
  Users,
  Wallet,
  Settings,
  BarChart3,
  Brain,
  FileText,
  Calendar,
  ClipboardCheck,
  CreditCard,
  UserCog,
  Clock,
  PieChart,
} from "lucide-react"

const roles = [
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    title: "System Administrator",
    description: "Complete control over the entire university system",
    features: [
      { icon: Users, name: "User Management", desc: "Create, manage, and monitor all user accounts" },
      { icon: Settings, name: "System Settings", desc: "Configure system-wide preferences and policies" },
      { icon: BarChart3, name: "Full BI Dashboard", desc: "Access comprehensive analytics and reports" },
    ],
  },
  {
    id: "rector",
    label: "Rector/Dean",
    icon: Award,
    title: "Rector & Dean Portal",
    description: "Strategic oversight and institutional intelligence",
    features: [
      { icon: PieChart, name: "Strategic BI Dashboard", desc: "High-level institutional performance metrics" },
      { icon: Brain, name: "AI Predictions", desc: "Predictive analytics for enrollment and performance" },
      { icon: FileText, name: "Performance Reports", desc: "Comprehensive institutional reports" },
    ],
  },
  {
    id: "department",
    label: "Dept. Head",
    icon: Building2,
    title: "Department Head",
    description: "Manage your department effectively",
    features: [
      { icon: BookOpen, name: "Course Management", desc: "Create and organize department courses" },
      { icon: BarChart3, name: "Department Analytics", desc: "Track department performance metrics" },
      { icon: Clock, name: "Staff Workload", desc: "Monitor and balance faculty workloads" },
    ],
  },
  {
    id: "professor",
    label: "Professor",
    icon: BookOpen,
    title: "Professor Portal",
    description: "Everything you need to teach effectively",
    features: [
      { icon: Calendar, name: "Course List", desc: "View and manage your assigned courses" },
      { icon: ClipboardCheck, name: "Grade Submission", desc: "Easy grade entry and management" },
      { icon: Users, name: "Attendance Tracking", desc: "Digital attendance management" },
    ],
  },
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    title: "Student Portal",
    description: "Your academic journey, simplified",
    features: [
      { icon: FileText, name: "Enrollment", desc: "Easy course registration and enrollment" },
      { icon: BarChart3, name: "Grades", desc: "View grades and academic progress" },
      { icon: Calendar, name: "Timetable", desc: "Personal class schedule and calendar" },
      { icon: Brain, name: "AI Academic Advisor", desc: "Smart recommendations for your studies" },
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: Users,
    title: "Human Resources",
    description: "Complete HR management solution",
    features: [
      { icon: UserCog, name: "Staff Profiles", desc: "Manage employee information and records" },
      { icon: FileText, name: "Contracts", desc: "Contract management and tracking" },
      { icon: Calendar, name: "Leave Management", desc: "Handle leave requests and approvals" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Wallet,
    title: "Finance Department",
    description: "Financial management made easy",
    features: [
      { icon: CreditCard, name: "Payments", desc: "Process and track all payments" },
      { icon: PieChart, name: "Budget Reports", desc: "Comprehensive budget tracking and reports" },
    ],
  },
]

export function RolesSection() {
  const [activeRole, setActiveRole] = useState("admin")

  return (
    <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Tailored Interfaces for Every Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each user gets a customized experience designed for their specific needs and responsibilities.
          </p>
        </div>

        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            {roles.map((role) => (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border border-border data-[state=active]:border-primary"
              >
                <role.icon className="w-4 h-4" />
                {role.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {roles.map((role) => (
            <TabsContent key={role.id} value={role.id} className="mt-0">
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <role.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {role.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <feature.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-2xl"></div>
                      <img
                        src={`/.jpg?height=400&width=600&query=${role.title} dashboard interface`}
                        alt={`${role.title} Interface Preview`}
                        className="relative w-full h-auto rounded-xl border border-border shadow-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
