'use client';

import { BookOpen, Users } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';

const mockCourses = [
  {
    id: 1,
    code: 'CS101',
    title: 'Introduction to Programming',
    section: 'A',
    semester: 'Spring 2024',
    students: 45,
    schedule: 'MWF 10:00-11:00',
  },
  {
    id: 2,
    code: 'CS201',
    title: 'Data Structures',
    section: 'B',
    semester: 'Spring 2024',
    students: 38,
    schedule: 'TTh 14:00-15:30',
  },
  {
    id: 3,
    code: 'CS301',
    title: 'Algorithms',
    section: 'A',
    semester: 'Spring 2024',
    students: 32,
    schedule: 'MWF 13:00-14:00',
  },
];

export default function MyCoursesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="professor" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Professor" currentPage="My Courses" />
        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Courses</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{mockCourses.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{mockCourses.reduce((sum, c) => sum + c.students, 0)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Hours/Week</p>
                <p className="text-3xl font-bold">4.5</p>
              </div>
            </div>

            <div className="grid gap-6">
              {mockCourses.map((course) => (
                <div key={course.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">{course.code}-{course.section}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <p>Semester: {course.semester}</p>
                        <p>Schedule: {course.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Enrolled Students</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="text-2xl font-bold">{course.students}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition text-sm font-medium">
                      Manage Roster
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
