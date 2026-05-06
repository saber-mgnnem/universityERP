'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await API.get('/professor-schedule');

      const grouped = groupByDay(res.data);
      setSchedule(grouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GROUP DATA BY DAY
  const groupByDay = (data) => {
    const days = {};

    data.forEach((item) => {
      const day = item.course_schedule_day;

      if (!days[day]) {
        days[day] = [];
      }

      days[day].push({
        code: item.course?.course_code,
        title: item.course?.course_name,
        time: `${item.class_start_time} - ${item.class_end_time}`,
        room: item.classroom_location,
        students: item.capacity, // or enrolled count later
      });
    });

    return Object.keys(days).map((day, index) => ({
      id: index,
      day,
      courses: days[day],
    }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8">
      <div className="space-y-8">

        <h1 className="text-3xl font-bold">My Schedule</h1>

        {/* CLASS SCHEDULE */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Class Schedule</h2>

          <div className="space-y-4">
            {schedule.map((day) => (
              <div key={day.id} className="bg-card border border-border rounded-lg p-6">

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {day.day}
                </h3>

                <div className="space-y-3">
                  {day.courses.map((course, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-muted rounded-lg">

                      <div className="flex-1">
                        <p className="font-semibold text-lg">
                          {course.code}: {course.title}
                        </p>

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
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="text-2xl font-bold">
                          {course.students}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* OPTIONAL OFFICE HOURS (STATIC FOR NOW) */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="font-semibold mb-2">Tuesday</p>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  15:00 - 16:30
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Office 301
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <p className="font-semibold mb-2">Thursday</p>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  15:00 - 16:30
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Office 301
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}