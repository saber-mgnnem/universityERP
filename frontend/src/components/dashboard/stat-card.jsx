import { Card, CardContent } from "@/components/ui/card"

export function StatCard({ title, value, change, changeType, icon: Icon }) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={`text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {changeType === "positive" ? "+" : "-"}
                {change} from last month
              </p>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
