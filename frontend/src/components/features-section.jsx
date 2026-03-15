import { Card, CardContent } from "@/components/ui/card"
import { Brain, Shield, Zap, Globe, BarChart3, Lock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Leverage machine learning for predictive analytics, smart recommendations, and automated workflows.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption, role-based access control, and compliance with education data regulations.",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Instant data synchronization across all modules. Changes reflect immediately system-wide.",
  },
  {
    icon: Globe,
    title: "Multi-campus Support",
    description: "Manage multiple campuses, branches, and departments from a single unified platform.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards and reports for data-driven decision making at every level.",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "GDPR compliant with full data ownership. Your institutional data stays yours.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Built for Modern Universities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run a world-class institution, powered by cutting-edge technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
