import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, GraduationCap, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"

const plans = [
  { name: "Starter", description: "Perfect for small institutions", price: "2,999", period: "/month", features: ["Up to 1,000 students", "5 admin users", "Basic analytics dashboard", "Email support", "Core modules (Academic, HR)", "99.5% uptime SLA"], highlighted: false },
  { name: "Professional", description: "For growing universities", price: "7,999", period: "/month", features: ["Up to 10,000 students", "25 admin users", "Advanced BI dashboard", "Priority support", "All modules included", "AI Academic Advisor", "API access", "99.9% uptime SLA"], highlighted: true },
  { name: "Enterprise", description: "For large institutions", price: "Custom", period: "", features: ["Unlimited students", "Unlimited admin users", "Custom BI dashboards", "24/7 dedicated support", "All modules + custom development", "Full AI suite", "On-premise deployment option", "99.99% uptime SLA", "Dedicated account manager"], highlighted: false },
]

export function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">UniERP</span>
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Simple, transparent pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your institution. All plans include free setup, training, and data migration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`border-border relative ${plan.highlighted ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price === "Custom" ? "" : "$"}{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} size="lg">
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
                { q: "Is there a free trial?", a: "We offer a 30-day free trial for Professional plans. Contact us for Enterprise trial options." },
                { q: "What payment methods do you accept?", a: "We accept all major credit cards, bank transfers, and can set up invoicing for Enterprise customers." },
                { q: "Do you offer discounts for education?", a: "Yes! As an education-focused platform, we offer significant discounts for public universities and non-profits." },
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
