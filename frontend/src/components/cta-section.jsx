import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Ready to Transform Your University?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Join 500+ universities already using UniERP to streamline operations, improve student outcomes, and make
          data-driven decisions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule a Demo
            </Button>
          </Link>
          <Link to="/pricing">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
