'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import { Plus } from 'lucide-react';

const mockDepartments = [
  { id: 1, name: 'Computer Science', head: 'Dr. Ahmed Hassan', faculty: 24, students: 450, budget: '$250,000' },
  { id: 2, name: 'Engineering', head: 'Dr. Fatima Ali', faculty: 32, students: 620, budget: '$380,000' },
  { id: 3, name: 'Business', head: 'Prof. Mohamed Ibrahim', faculty: 18, students: 350, budget: '$180,000' },
  { id: 4, name: 'Medicine', head: 'Dr. Amina Karim', faculty: 40, students: 200, budget: '$500,000' },
  { id: 5, name: 'Arts & Humanities', head: 'Prof. Laila Mansour', faculty: 22, students: 380, budget: '$120,000' },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDepartment = (formData) => {
    setDepartments([...departments, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Department Name' },
    { key: 'head', label: 'Department Head' },
    { key: 'faculty', label: 'Faculty Members' },
    { key: 'students', label: 'Students' },
    { key: 'budget', label: 'Annual Budget' },
  ];

  const formFields = [
    { name: 'name', label: 'Department Name', required: true },
    { name: 'head', label: 'Department Head', required: true },
    { name: 'budget', label: 'Annual Budget', placeholder: 'e.g., $250,000', required: true },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="rector" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Rector" currentPage="Departments" />
        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Departments</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Add Department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Departments</p>
                <p className="text-3xl font-bold">{departments.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-3xl font-bold">{departments.reduce((sum, d) => sum + d.faculty, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{departments.reduce((sum, d) => sum + d.students, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg Faculty/Dept</p>
                <p className="text-3xl font-bold">{Math.round(departments.reduce((sum, d) => sum + d.faculty, 0) / departments.length)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg Students/Dept</p>
                <p className="text-3xl font-bold">{Math.round(departments.reduce((sum, d) => sum + d.students, 0) / departments.length)}</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={departments}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Department"
        fields={formFields}
        onSubmit={handleAddDepartment}
      />
    </div>
  );
}
