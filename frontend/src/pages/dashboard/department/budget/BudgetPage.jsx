'use client';

import { useState } from 'react';

import { BarChartComponent } from '@/components/dashboard/chart';
import FormModal from '@/components/dashboard/form-modal';
import { Plus } from 'lucide-react';

const budgetData = [
  { name: 'Salaries', amount: 450 },
  { name: 'Equipment', amount: 150 },
  { name: 'Materials', amount: 100 },
  { name: 'Travel', amount: 80 },
  { name: 'Other', amount: 70 },
];

const mockExpenses = [
  { id: 1, category: 'Equipment', description: 'Laboratory equipment', amount: '$25,000', date: '2024-02-10', status: 'approved' },
  { id: 2, category: 'Materials', description: 'Office supplies', amount: '$5,000', date: '2024-02-08', status: 'pending' },
  { id: 3, category: 'Travel', description: 'Conference attendance', amount: '$8,000', date: '2024-02-05', status: 'approved' },
];

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (formData) => {
    console.log('Budget request submitted:', formData);
    setIsModalOpen(false);
  };

  const formFields = [
    { name: 'category', label: 'Category', type: 'select', options: ['Equipment', 'Materials', 'Travel', 'Other'], required: true },
    { name: 'description', label: 'Description', required: true },
    { name: 'amount', label: 'Amount', placeholder: '$', required: true },
    { name: 'justification', label: 'Justification', type: 'textarea', required: true },
  ];

  return (
  
        <main className="p-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Budget Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Request Funds
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Annual Budget</p>
                <p className="text-3xl font-bold">$850K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-3xl font-bold">$620K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-3xl font-bold">$230K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Utilization</p>
                <p className="text-3xl font-bold">72.9%</p>
              </div>
            </div>

            <BarChartComponent
              data={budgetData}
              dataKey="amount"
              fill="#3b82f6"
              title="Budget Allocation by Category (in thousands)"
            />

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Recent Expense Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockExpenses.map((expense) => (
                      <tr key={expense.id} className="border-t border-border hover:bg-muted/50">
                        <td className="px-6 py-4 text-sm">{expense.category}</td>
                        <td className="px-6 py-4 text-sm">{expense.description}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{expense.amount}</td>
                        <td className="px-6 py-4 text-sm">{expense.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            expense.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {expense.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Budget Funds"
        fields={formFields}
        onSubmit={handleSubmit}
      />
        </main>

    
  );
}
