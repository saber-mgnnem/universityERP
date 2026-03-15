import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "UniERP transformed how we manage our institution. The AI advisor feature has helped our students make better academic decisions.",
    author: "Dr. Sarah Mitchell",
    role: "Rector, Stanford University",
  },
  {
    quote:
      "The finance module alone saved us 40% of our administrative time. The ROI was visible within the first semester.",
    author: "James Chen",
    role: "CFO, MIT",
  },
  {
    quote:
      "As a department head, I finally have visibility into faculty workloads and can make data-driven staffing decisions.",
    author: "Prof. Maria Garcia",
    role: "Head of Engineering, Caltech",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Leading Institutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what university leaders are saying about UniERP.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-muted"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=48&width=48&query=${testimonial.author} professional portrait)`,
                      backgroundSize: "cover",
                    }}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
