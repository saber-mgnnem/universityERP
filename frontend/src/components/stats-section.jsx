export function StatsSection() {
  const stats = [
    { value: "500+", label: "Universities", sublabel: "using UniERP" },
    { value: "2M+", label: "Students", sublabel: "managed daily" },
    { value: "98%", label: "Satisfaction", sublabel: "rate" },
    { value: "40%", label: "Time Saved", sublabel: "on admin tasks" },
  ]

  return (
    <section className="py-16 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
