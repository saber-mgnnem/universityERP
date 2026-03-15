'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import { Plus } from 'lucide-react';

const mockFaculty = [
  { id: 1, name: 'Dr. Ahmed Hassan', email: 'ahmed@univ.edu', specialization: 'AI/ML', courses: 3, students: 85, rating: '4.8/5' },
  { id: 2, name: 'Prof. Fatima Ali', email: 'fatima@univ.edu', specialization: 'Database', courses: 2, students: 60, rating: '4.6/5' },
  { id: 3, name: 'Dr. Mohamed Ibrahim', email: 'mohammad@univ.edu', specialization: 'Web Dev', courses: 4, students: 120, rating: '4.5/5' },
  { id: 4, name: 'Prof. Amina Karim', email: 'amina@univ.edu', specialization: 'Security', courses: 2, students: 50, rating: '4.7/5' },
  { id: 5, name: 'Dr. Laila Mansour', email: 'laila@univ.edu', specialization: 'Graphics', courses: 3, students: 75, rating: '4.4/5' },
];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFaculty = (formData) => {
    setFaculty([...faculty, { ...formData, id: Date.now(), courses: 0, students: 0, rating: '0/5' }]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'courses', label: 'Courses' },
    { key: 'students', label: 'Students' },
    { key: 'rating', label: 'Rating' },
  ];

  const formFields = [
    { name: 'name', label: 'Full Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'specialization', label: 'Specialization', required: true },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="department" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Department Head" currentPage="Faculty" />
        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Faculty Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Add Faculty
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-3xl font-bold">{faculty.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{faculty.reduce((sum, f) => sum + f.courses, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{faculty.reduce((sum, f) => sum + f.students, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-3xl font-bold">4.6/5</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={faculty}
              searchable={true}
              pagination={true}
            />
          </div>
        </main>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Faculty"
        fields={formFields}
        onSubmit={handleAddFaculty}
      />
    </div>
  );
}
