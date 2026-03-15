'use client';

import { useState } from 'react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import StatusBadge from '@/components/dashboard/status-badge';
import { Plus } from 'lucide-react';

const mockCourses = [
  { id: 1, code: 'CS101', title: 'Introduction to Programming', instructor: 'Dr. Ahmed Hassan', credits: 3, enrolled: 45, capacity: 50, status: 'active' },
  { id: 2, code: 'CS201', title: 'Data Structures', instructor: 'Prof. Fatima Ali', credits: 4, enrolled: 38, capacity: 40, status: 'active' },
  { id: 3, code: 'CS301', title: 'Algorithms', instructor: 'Dr. Mohamed Ibrahim', credits: 3, enrolled: 32, capacity: 35, status: 'active' },
  { id: 4, code: 'CS401', title: 'Machine Learning', instructor: 'Prof. Amina Karim', credits: 4, enrolled: 25, capacity: 30, status: 'active' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = (formData) => {
    setCourses([...courses, { ...formData, id: Date.now(), enrolled: 0, status: 'active' }]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'code', label: 'Course Code' },
    { key: 'title', label: 'Title' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'credits', label: 'Credits' },
    { key: 'enrolled', label: 'Enrolled' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const formFields = [
    { name: 'code', label: 'Course Code', placeholder: 'e.g., CS101', required: true },
    { name: 'title', label: 'Course Title', required: true },
    { name: 'instructor', label: 'Instructor', type: 'select', options: ['Dr. Ahmed Hassan', 'Prof. Fatima Ali', 'Dr. Mohamed Ibrahim', 'Prof. Amina Karim'], required: true },
    { name: 'credits', label: 'Credits', type: 'number', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', required: true },
  ];

  return (

        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Course Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Add Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Enrollment</p>
                <p className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.capacity, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className="text-3xl font-bold">82.5%</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={courses}
              searchable={true}
              pagination={true}
            />
          </div>
           <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Course"
        fields={formFields}
        onSubmit={handleAddCourse}
      />
        </main>

     
  );
}
