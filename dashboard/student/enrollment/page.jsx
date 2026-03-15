'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

const mockCourses = [
  { id: 1, code: 'CS101', title: 'Introduction to Programming', instructor: 'Dr. Ahmed Hassan', credits: 3, schedule: 'MWF 10:00-11:00', enrolled: false },
  { id: 2, code: 'CS201', title: 'Data Structures', instructor: 'Prof. Fatima Ali', credits: 4, schedule: 'TTh 14:00-15:30', enrolled: false },
  { id: 3, code: 'MATH101', title: 'Calculus I', instructor: 'Dr. Mohamed Ibrahim', credits: 4, schedule: 'MWF 13:00-14:00', enrolled: false },
  { id: 4, code: 'PHY101', title: 'Physics I', instructor: 'Prof. Amina Karim', credits: 3, schedule: 'TTh 10:00-11:30', enrolled: false },
];

const mockEnrolled = [
  { id: 1, code: 'CS101', title: 'Introduction to Programming', instructor: 'Dr. Ahmed Hassan', credits: 3, schedule: 'MWF 10:00-11:00', status: 'enrolled' },
  { id: 2, code: 'CS301', title: 'Algorithms', instructor: 'Dr. Mohamed Ibrahim', credits: 3, schedule: 'MWF 13:00-14:00', status: 'enrolled' },
  { id: 3, code: 'MATH101', title: 'Calculus I', instructor: 'Dr. Ahmed Hassan', credits: 4, schedule: 'TTh 10:00-11:30', status: 'enrolled' },
];

export default function EnrollmentPage() {
  const [enrolled, setEnrolled] = useState(mockEnrolled);
  const [available] = useState(mockCourses);

  const handleEnroll = (course) => {
    setEnrolled([...enrolled, { ...course, enrolled: true, status: 'enrolled' }]);
  };

  const handleDrop = (id) => {
    setEnrolled(enrolled.filter(c => c.id !== id));
  };

  const enrolledColumns = [
    { key: 'code', label: 'Code' },
    { key: 'title', label: 'Course Title' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'credits', label: 'Credits' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Student" currentPage="Enrollment" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Course Enrollment</h1>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Enrolled Courses ({enrolled.length})</h2>
              <div className="space-y-3">
                {enrolled.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{course.code}: {course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor} • {course.credits} credits • {course.schedule}</p>
                    </div>
                    <button
                      onClick={() => handleDrop(course.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition"
                    >
                      <Minus className="h-4 w-4" />
                      Drop
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
              <div className="space-y-3">
                {available.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{course.code}: {course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor} • {course.credits} credits • {course.schedule}</p>
                    </div>
                    <button
                      onClick={() => handleEnroll(course)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                    >
                      <Plus className="h-4 w-4" />
                      Enroll
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Enrollment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold">{enrolled.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Credits</p>
                  <p className="text-3xl font-bold">{enrolled.reduce((sum, c) => sum + c.credits, 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-xl font-bold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
