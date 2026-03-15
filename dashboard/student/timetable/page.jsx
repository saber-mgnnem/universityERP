'use client';

import { Clock, MapPin } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';

const timetable = {
  Monday: [
    { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', instructor: 'Dr. Ahmed Hassan' },
    { code: 'MATH101', title: 'Calculus I', time: '14:00 - 15:30', room: 'A205', instructor: 'Prof. Laila Mansour' },
  ],
  Tuesday: [
    { code: 'CS301', title: 'Algorithms', time: '13:00 - 14:30', room: 'B310', instructor: 'Dr. Mohamed Ibrahim' },
  ],
  Wednesday: [
    { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', instructor: 'Dr. Ahmed Hassan' },
    { code: 'PHY101', title: 'Physics I', time: '15:00 - 16:30', room: 'L101', instructor: 'Prof. Amina Karim' },
  ],
  Thursday: [
    { code: 'MATH101', title: 'Calculus I', time: '14:00 - 15:30', room: 'A205', instructor: 'Prof. Laila Mansour' },
  ],
  Friday: [
    { code: 'CS101', title: 'Introduction to Programming', time: '10:00 - 11:00', room: 'B101', instructor: 'Dr. Ahmed Hassan' },
  ],
};

export default function TimetablePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Student" currentPage="Timetable" />
        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Weekly Timetable</h1>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Export to Calendar
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(timetable).map(([day, classes]) => (
                <div key={day} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">{day}</h3>
                  {classes.length > 0 ? (
                    <div className="space-y-3">
                      {classes.map((cls, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition">
                          <div className="flex-1">
                            <p className="font-semibold text-lg">{cls.code}: {cls.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">Instructor: {cls.instructor}</p>
                            <div className="mt-3 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                {cls.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4" />
                                {cls.room}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No classes scheduled</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Weekly Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-3xl font-bold">11</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days with Classes</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
