import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              New: AI-Powered Academic Advisor
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              The Complete Platform for <span className="text-primary">University Management</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Streamline your entire institution with our unified ERP solution. From academics to administration, HR to
              finance — everything in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Request Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Play className="w-4 h-4" />
                Watch Video
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=40&width=40&query=university student avatar ${i})`,
                      backgroundSize: "cover",
                    }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Trusted by 500+ Universities</p>
                <p className="text-muted-foreground">Worldwide</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              <div className="p-1 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2 px-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">dashboard.unierp.edu</div>
                </div>
              </div>
              <div className="p-6">
                <img
                  src="/university-erp-dashboard-with-analytics-charts.jpg"
                  alt="UniERP Dashboard Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
