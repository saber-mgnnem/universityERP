'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import API from '@/services/api';

export default function TimetablePage() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await API.get('/student-timetable');
      setTimetable(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading timetable...</div>;
  }

  return (
    <main className="p-8">
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">Weekly Timetable</h1>

        <div className="space-y-6">

          {Object.keys(timetable).length === 0 && (
            <p className="text-muted-foreground">No classes enrolled</p>
          )}

          {Object.entries(timetable).map(([day, classes]) => {

            // 🔥 SORT BY START TIME
            const sortedClasses = [...classes].sort((a, b) => {
              return a.time.localeCompare(b.time);
            });

            return (
              <div key={day} className="bg-card border rounded-lg p-6">

                {/* DAY TITLE */}
                <h3 className="text-xl font-bold mb-4">{day}</h3>

                {/* ROW LAYOUT */}
                <div className="flex gap-4 overflow-x-auto">

                  {sortedClasses.map((cls, idx) => (
                    <div
                      key={idx}
                      className="min-w-[250px] p-4 bg-muted rounded-lg"
                    >

                      <p className="font-semibold text-lg">
                        {cls.code}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {cls.title}
                      </p>

                      <p className="text-sm mt-1">
                        Instructor: {cls.instructor}
                      </p>

                      <div className="mt-3 space-y-2 text-sm">

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {cls.time}
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {cls.room}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}