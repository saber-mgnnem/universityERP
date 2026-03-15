'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';

const mockSchedule = [
  {
    id: 1,
    day: 'Monday',
    courses: [
      { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', students: 45 },
      { code: 'CS201', title: 'Data Structures', time: '14:00 - 15:30', room: 'B205', students: 38 },
    ],
  },
  {
    id: 2,
    day: 'Wednesday',
    courses: [
      { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', students: 45 },
      { code: 'CS301', title: 'Algorithms', time: '13:00 - 14:00', room: 'B310', students: 32 },
    ],
  },
  {
    id: 3,
    day: 'Friday',
    courses: [
      { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', students: 45 },
    ],
  },
];

const officeHours = [
  { day: 'Tuesday', time: '15:00 - 16:30', location: 'Office 301' },
  { day: 'Thursday', time: '15:00 - 16:30', location: 'Office 301' },
];

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="professor" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Professor" currentPage="Schedule" />
        <main className="p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">My Schedule</h1>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Class Schedule</h2>
              <div className="space-y-4">
                {mockSchedule.map((day) => (
                  <div key={day.id} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {day.day}
                    </h3>
                    <div className="space-y-3">
                      {day.courses.map((course, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold text-lg">{course.code}: {course.title}</p>
                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {course.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {course.room}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Students</p>
                            <p className="text-2xl font-bold">{course.students}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officeHours.map((hour, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-4">
                    <p className="font-semibold mb-2">{hour.day}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {hour.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {hour.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
