'use client';


import { BarChartComponent } from '@/components/dashboard/chart';

const budgetData = [
  { name: 'Academic', allocated: 800 },
  { name: 'Infrastructure', allocated: 600 },
  { name: 'Operations', allocated: 400 },
  { name: 'Utilities', allocated: 300 },
  { name: 'Research', allocated: 500 },
];

const departmentBudget = [
  { id: 1, department: 'Computer Science', allocated: '$250,000', spent: '$195,000', remaining: '$55,000', utilization: '78%' },
  { id: 2, department: 'Engineering', allocated: '$380,000', spent: '$320,000', remaining: '$60,000', utilization: '84%' },
  { id: 3, department: 'Business', allocated: '$180,000', spent: '$155,000', remaining: '$25,000', utilization: '86%' },
  { id: 4, department: 'Medicine', allocated: '$500,000', spent: '$445,000', remaining: '$55,000', utilization: '89%' },
];

export default function BudgetPage() {
  return (

        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Budget Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold">$2.6M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Allocated</p>
                <p className="text-3xl font-bold">$2.15M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-3xl font-bold">$1.81M</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-3xl font-bold">$790K</p>
              </div>
            </div>

            <BarChartComponent
              data={budgetData}
              dataKey="allocated"
              fill="#3b82f6"
              title="Budget Allocation by Category (in thousands)"
            />

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Department Budget Status</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Allocated</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Spent</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Remaining</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentBudget.map((dept) => (
                      <tr key={dept.id} className="border-t border-border hover:bg-muted/50">
                        <td className="px-6 py-4 text-sm font-semibold">{dept.department}</td>
                        <td className="px-6 py-4 text-sm">{dept.allocated}</td>
                        <td className="px-6 py-4 text-sm">{dept.spent}</td>
                        <td className="px-6 py-4 text-sm text-green-600">{dept.remaining}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: dept.utilization }}
                              ></div>
                            </div>
                            {dept.utilization}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
     
  );
}
