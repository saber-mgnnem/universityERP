'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

export default function AttendancePage() {
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await API.get('/professor/offerings');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH STUDENTS =================
  const fetchStudents = async (offeringId) => {
    try {
      const res = await API.get(
        `/enrolled-students?course_offering_id=${offeringId}`
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH ATTENDANCE =================
  const fetchAttendance = async (offeringId) => {
    try {
      const res = await API.get(
        `/attendance?course_offering_id=${offeringId}`
      );
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (course) {
      fetchStudents(course);
      fetchAttendance(course);
    } else {
      setStudents([]);
      setAttendance([]);
    }
  }, [course]);

  // ================= MARK ATTENDANCE =================
  const markAttendance = async (studentId, status) => {
    await API.post('/attendance', {
      course_offering_id: course,
      student_id: studentId,
      attendance_date: today,
      attendance_status: status,
    });

    fetchAttendance(course);
  };

  // ================= UPDATE =================
  const updateAttendance = async (id, status) => {
    await API.put(`/attendance/${id}`, {
      attendance_status: status,
    });

    fetchAttendance(course);
  };

  // ================= DELETE =================
  const deleteAttendance = async (id) => {
    await API.delete(`/attendance/${id}`);
    fetchAttendance(course);
  };

  return (
    <main className="p-8">
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">Attendance Tracking</h1>

        {/* ================= COURSE SELECT (PILLS STYLE) ================= */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCourse('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              course === ''
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            All Courses
          </button>

          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourse(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                course === c.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {c.course?.course_code}
            </button>
          ))}
        </div>

        {/* ================= EMPTY STATE 1 ================= */}
        {!course && (
          <div className="text-center p-10 border rounded-lg bg-muted/20">
            <p className="text-lg font-medium">
              Please select a class to view attendance
            </p>
          </div>
        )}

        {/* ================= NO STUDENTS ================= */}
        {course && students.length === 0 && (
          <div className="text-center p-10 border rounded-lg bg-muted/20">
            <p className="text-lg font-medium text-muted-foreground">
              No enrolled students in this class yet
            </p>
          </div>
        )}

        {/* ================= STUDENT LIST ================= */}
        {course && students.length > 0 && (
          <div className="space-y-3">

            {students.map((s) => {
              const existing = attendance.find(
                (a) => a.student_id === s.student_id
              );

              return (
                <div
                  key={s.student_id}
                  className="flex justify-between p-4 border rounded-lg bg-card"
                >
                  <div>
                    <p className="font-bold">{s.name}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">

                    {/* PRESENT */}
                    <button
                      onClick={() =>
                        existing
                          ? updateAttendance(existing.id, 'Present')
                          : markAttendance(s.student_id, 'Present')
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Present
                    </button>

                    {/* ABSENT */}
                    <button
                      onClick={() =>
                        existing
                          ? updateAttendance(existing.id, 'Absent')
                          : markAttendance(s.student_id, 'Absent')
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Absent
                    </button>

                    {/* LATE */}
                    <button
                      onClick={() =>
                        existing
                          ? updateAttendance(existing.id, 'Late')
                          : markAttendance(s.student_id, 'Late')
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Late
                    </button>

                    {/* DELETE */}
                    {existing && (
                      <button
                        onClick={() => deleteAttendance(existing.id)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                      >
                        Delete
                      </button>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}