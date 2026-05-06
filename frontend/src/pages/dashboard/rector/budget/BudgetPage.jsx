'use client';

import { useEffect, useState } from 'react';
import { BarChartComponent } from '@/components/dashboard/chart';
import FormModal from '@/components/dashboard/dep-form-modal';
import { Plus } from 'lucide-react';
import { getDepartments } from '@/services/departmentService';

import { getBudgets, createBudget } from '@/services/departmentService';
import {getSessions} from '@/services/sessionService';
export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
const [departments, setDepartments] = useState([]);
const [sessions, setSessions] = useState([]);


const fetchDepartments = async () => {
  const data = await getDepartments();
  setDepartments(data);
};
const fetchSessions = async () => {
  const data = await getSessions();
  setSessions(data); // ✅ صحيح
};
  // 🔄 LOAD FROM API
  useEffect(() => {
    fetchBudgets();
     fetchDepartments();
  fetchSessions();
  }, []);

  const fetchBudgets = async () => {
    const data = await getBudgets();
    setBudgets(data);
  };

  // ➕ CREATE
const handleAllocate = async (formData) => {
  await createBudget({
    department_id: formData.department_id,
    academic_session_id: formData.academic_session_id,

    total_budget: Number(formData.total_budget),

    salaries_budget: Number(formData.salaries_budget || 0),
    equipment_budget: Number(formData.equipment_budget || 0),
    research_budget: Number(formData.research_budget || 0),
    maintenance_budget: Number(formData.maintenance_budget || 0),
    other_expenses_budget: Number(formData.other_expenses_budget || 0),

    allocated_amount: Number(formData.allocated_amount || 0),
    spent_amount: Number(formData.spent_amount || 0),
    remaining_amount: Number(formData.remaining_amount || 0),

    budget_status: formData.budget_status || 'Pending',
  });

  setIsModalOpen(false);
  fetchBudgets();
};
 

  // 📊 CHART DATA
  const chartData = budgets.map((b) => ({
    name: b.department?.department_name || 'Unknown',
    allocated: b.total_budget / 1000,
  }));

  return (
    <main className="p-8">
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Budget Management</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Allocate Funds
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat title="Total Budget" value={sum(budgets, 'total_budget')} />
          <Stat title="Spent" value={sum(budgets, 'spent_amount')} />
          <Stat title="Remaining" value={sum(budgets, 'remaining_amount')} />
          <Stat title="Departments" value={budgets.length} />
        </div>

        {/* CHART */}
        <BarChartComponent
          data={chartData}
          dataKey="allocated"
          fill="#3b82f6"
          title="Department Budget Allocation"
        />

        {/* TABLE */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Spent</th>
                <th className="px-6 py-3 text-left">Remaining</th>
              </tr>
            </thead>

            <tbody>
              {budgets.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-6 py-4">{b.department?.department_name}</td>
                  <td className="px-6 py-4">{b.total_budget}</td>
                  <td className="px-6 py-4">{b.spent_amount}</td>
                  <td className="px-6 py-4">{b.remaining_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

     <FormModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Allocate Budget"
  fields={[
    {
      name: 'department_id',
      label: 'Department',
      type: 'select',
      required: true,
      options: departments.map(d => ({
        label: d.department_name,
        value: d.id
      }))
    },

    {
      name: 'academic_session_id',
      label: 'Academic Session',
      type: 'select',
      required: true,
     options: (sessions || []).map(s => ({
  label: s.session_name + ' (' + s.session_year + ')',
  value: s.id
}))
    },
    { name: 'total_budget', label: 'Total Budget', type: 'number', required: true },

    { name: 'salaries_budget', label: 'Salaries Budget', type: 'number' },
    { name: 'equipment_budget', label: 'Equipment Budget', type: 'number' },
    { name: 'research_budget', label: 'Research Budget', type: 'number' },
    { name: 'maintenance_budget', label: 'Maintenance Budget', type: 'number' },
    { name: 'other_expenses_budget', label: 'Other Expenses', type: 'number' },

    { name: 'allocated_amount', label: 'Allocated Amount', type: 'number' },
    { name: 'spent_amount', label: 'Spent Amount', type: 'number' },
    { name: 'remaining_amount', label: 'Remaining Amount', type: 'number' },

    {
      name: 'budget_status',
      label: 'Status',
      type: 'select',
      options: ['Pending', 'Approved', 'Rejected']
    }
  ]}
  onSubmit={handleAllocate}
/>
    </main>
  );
}

// helpers
function sum(arr, key) {
  return arr.reduce((acc, i) => acc + Number(i[key] || 0), 0);
}

function Stat({ title, value }) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}