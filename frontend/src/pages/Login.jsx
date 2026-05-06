
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 🔐 Call API login
     const user = await login(email, password)

const role = user?.roles?.[0]?.role_code

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
          case "hr_manager":
            redirectPath = "/hr"
            break
          case "finance_manager":
            redirectPath = "/finance"
            break
            case "department":
            redirectPath = "/department"
            break
            case "rector":
            redirectPath = "/rector"
            break
          default:
            redirectPath = "/"
        }
      }

      navigate(redirectPath, { replace: true })
    } catch (err) {
      console.error(err)
      alert("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
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
          <h1 className="text-4xl font-bold text-primary-foreground">
            Manage your university with confidence
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Access your personalized dashboard and streamline your daily tasks.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2026 UniERP. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Card>
            <CardHeader>
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6" />
                <span className="font-bold text-xl">UniERP</span>
              </div>

              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label>Password</Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

