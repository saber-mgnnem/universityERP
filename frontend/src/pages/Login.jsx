// src/pages/Login.jsx
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Determine where to redirect after login
  const from = location.state?.from?.pathname || null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!role) return

    // Set user in AuthContext and localStorage
    login({ role })

    // Determine redirect based on role
    let redirectPath = "/"
    if (from) {
      redirectPath = from
    } else {
      switch (role) {
        case "admin":
          redirectPath = "/admin"
          break
        case "student":
          redirectPath = "/student"
          break
        case "professor":
          redirectPath = "/professor"
          break
        case "rector":
          redirectPath = "/rector"
          break
        case "department":
          redirectPath = "/department"
          break
        case "hr":
          redirectPath = "/hr"
          break
        case "finance":
          redirectPath = "/finance"
          break
        default:
          redirectPath = "/"
      }
    }

    navigate(redirectPath, { replace: true })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-primary-foreground">UniERP</span>
          </Link>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Manage your university with confidence
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Access your personalized dashboard and streamline your daily tasks with our comprehensive ERP solution.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-primary bg-primary-foreground/20"
                />
              ))}
            </div>
            <p className="text-sm text-primary-foreground/80">Join 2M+ users worldwide</p>
          </div>
        </div>
        <p className="text-sm text-primary-foreground/60">© 2026 UniERP. All rights reserved.</p>
      </div>

      {/* Right login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Card className="border-border">
            <CardHeader className="space-y-1">
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">UniERP</span>
              </div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role selector */}
                <div className="space-y-2">
                  <Label htmlFor="role">Select Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="rector">Rector / Dean</SelectItem>
                      <SelectItem value="department">Department Head</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="hr">HR Manager</SelectItem>
                      <SelectItem value="finance">Finance Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@university.edu" />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!role}>
                  Sign in
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}