'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import { Upload } from 'lucide-react';

const mockGrades = [
  { id: 1, studentId: 'CS001', name: 'Ahmed Mohammad', course: 'CS101', midterm: 85, final: 88, assignment: 90, grade: 'A', status: 'submitted' },
  { id: 2, studentId: 'CS002', name: 'Fatima Al-Mansoury', course: 'CS101', midterm: 92, final: 95, assignment: 93, grade: 'A+', status: 'submitted' },
  { id: 3, studentId: 'CS003', name: 'Mohamed Ali', course: 'CS101', midterm: 78, final: 82, assignment: 80, grade: 'B', status: 'submitted' },
  { id: 4, studentId: 'CS004', name: 'Amina Hassan', course: 'CS101', midterm: 88, final: 91, assignment: 89, grade: 'A', status: 'submitted' },
  { id: 5, studentId: 'CS005', name: 'Karim Ibrahim', course: 'CS101', midterm: 72, final: 75, assignment: 73, grade: 'C', status: 'pending' },
];

export default function GradesPage() {
  const [grades, setGrades] = useState(mockGrades);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitGrades = (formData) => {
    console.log('Grades submitted:', formData);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'course', label: 'Course' },
    { key: 'midterm', label: 'Midterm' },
    { key: 'final', label: 'Final' },
    { key: 'assignment', label: 'Assignment' },
    { key: 'grade', label: 'Final Grade', render: (val) => <span className="font-bold text-lg">{val}</span> },
    { key: 'status', label: 'Status', render: (val) => <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${val === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{val}</span> },
  ];

  const formFields = [
    { name: 'course', label: 'Course', type: 'select', options: ['CS101', 'CS201', 'CS301'], required: true },
    { name: 'gradeFile', label: 'Upload Grades (CSV)', type: 'file', required: true },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="professor" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Professor" currentPage="Grade Submission" />
        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Grade Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Upload className="h-5 w-5" />
                Submit Grades
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{grades.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Average GPA</p>
                <p className="text-3xl font-bold">3.7</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">1</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Grade Distribution</h2>
              <DataTable
                columns={columns}
                data={grades}
                searchable={true}
                pagination={true}
              />
            </div>
          </div>
        </main>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Grades"
        fields={formFields}
        onSubmit={handleSubmitGrades}
      />
    </div>
  );
}
