'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import { BookOpen, Users } from 'lucide-react';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔥 LOCK SCROLL WHEN MODAL OPEN
  useEffect(() => {
    document.body.style.overflow = selectedCourse ? 'hidden' : 'auto';
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/course-offerings');
      console.log(res.data)
      // 🔥 filter only courses of logged-in professor
      const userId = JSON.parse(localStorage.getItem('user'))?.id;

      const myCourses = res.data.filter(
        (c) => c.instructor?.id === userId
      );

      setCourses(myCourses);
    } catch (err) {
      console.error('Error fetching courses', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold">My Courses</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <p className="text-3xl font-bold">{courses.length}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-3xl font-bold">
              {courses.reduce((sum, c) => sum + (c.capacity || 0), 0)}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Hours/Week</p>
            <p className="text-3xl font-bold">--</p>
          </div>
        </div>

        {/* COURSES LIST */}
        <div className="grid gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {course.course?.course_title}
                    </span>
                  </div> 
                  {/* COURSE CODE */}
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                     Code Cours:  {course.course?.course_code}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold mb-2">
                    {course.course?.course_name}
                  </h3>

                  {/* INFO */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <p>
                      Semester: {course.semester?.semester_name}
                    </p>
                    <p>
                      Schedule: {course.course_schedule_day}{' '}
                      {course.class_start_time} - {course.class_end_time}
                    </p>
                  </div>
                </div>

                {/* STUDENTS */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">
                      Capacity
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">
                        {course.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                >
                  View Details
                </button>

              
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          />

          {/* MODAL */}
          <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95">

            {/* HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCourse.course?.course_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedCourse.course?.course_code}
                </p>
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-2 gap-4 text-sm">

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Semester</p>
                <p className="font-medium">
                  {selectedCourse.semester?.semester_name}
                </p>
              </div>
               <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Course Code</p>
                <p className="font-medium">
                  {selectedCourse.course?.course_code}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Day</p>
                <p className="font-medium">
                  {selectedCourse.course_schedule_day}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Time</p>
                <p className="font-medium">
                  {selectedCourse.class_start_time} - {selectedCourse.class_end_time}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Room</p>
                <p className="font-medium">
                  {selectedCourse.classroom_location}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Capacity</p>
                <p className="font-medium">
                  {selectedCourse.capacity}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground">Instructor</p>
                <p className="font-medium">
                  {selectedCourse.instructor?.first_name}{' '}
                  {selectedCourse.instructor?.last_name}
                </p>
              </div>
              

            </div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}