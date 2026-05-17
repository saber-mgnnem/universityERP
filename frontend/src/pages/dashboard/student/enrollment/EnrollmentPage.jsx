'use client';

import { useEffect, useState, useMemo } from 'react';
import { Plus, Minus } from 'lucide-react';
import API from '@/services/api';

export default function EnrollmentPage() {

  const [offerings, setOfferings] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  const [courseCode, setCourseCode] = useState('');
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await Promise.all([
      fetchOfferings(),
      fetchEnrollments()
    ]);

    setLoading(false);
  };

  // =========================
  // FETCH OFFERINGS
  // =========================
  const fetchOfferings = async () => {
    try {
      const res = await API.get('/student-offerings');
      setOfferings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FETCH ENROLLMENTS
  // =========================
  const fetchEnrollments = async () => {
    try {
      const res = await API.get('/enrollments');

      // NOW returns course offerings directly
      setEnrolled(res.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ENROLL
  // =========================
  const handleEnroll = async () => {
    try {

      if (!courseCode.trim()) {
        alert('Course code is required');
        return;
      }

      await API.post('/enrollments', {
        course_code: courseCode.trim(),
      });

      setCourseCode('');
      setIsEnrollOpen(false);

      await init();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Enrollment failed'
      );
    }
  };

  // =========================
  // DROP
  // =========================
  const handleDrop = async (offeringId) => {

    try {

      await API.delete(`/enrollments/${offeringId}`);

      await init();

    } catch (err) {
      console.error(err);

      alert('Failed to drop course');
    }
  };

  // =========================
  // FILTER AVAILABLE
  // =========================
  const enrolledIds = useMemo(() => {

    // enrolled is now offerings directly
    return new Set(
      enrolled.map(e => e.id)
    );

  }, [enrolled]);

  const availableOfferings = useMemo(() => {

    return offerings.filter(
      o => !enrolledIds.has(o.id)
    );

  }, [offerings, enrolledIds]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (

    <main className="p-8 space-y-10">

      <h1 className="text-3xl font-bold">
        Student Enrollment
      </h1>

      {/* ================= MY COURSES ================= */}
      <section>

        <h2 className="text-2xl font-semibold mb-4">
          My Courses ({enrolled.length})
        </h2>

        <div className="space-y-3">

          {enrolled.map((offering) => (

            <div
              key={offering.id}
              className="flex justify-between p-4 border rounded-lg"
            >

              <div>

                <p className="font-semibold">
                  {offering.course?.course_code}
                  {' - '}
                  {offering.course?.course_title}
                </p>

                <p className="text-sm text-gray-500">
                  {offering.course_schedule_day}
                  {' '}
                  {offering.class_start_time}
                  {' - '}
                  {offering.class_end_time}
                </p>

              </div>

              <button
                onClick={() => handleDrop(offering.id)}
                className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg"
              >
                <Minus className="h-4 w-4 inline" />
                {' '}
                Drop
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ================= AVAILABLE ================= */}
      <section>

        <h2 className="text-2xl font-semibold mb-4">
          Available Courses
        </h2>

        <div className="space-y-3">

          {availableOfferings.map((offering) => (

            <div
              key={offering.id}
              className="flex justify-between p-4 border rounded-lg"
            >

              <div>

                <p className="font-semibold">
                  {offering.course?.course_code}
                  {' - '}
                  {offering.course?.course_title}
                </p>

                <p className="text-sm text-gray-500">
                  {offering.course_schedule_day}
                  {' '}
                  {offering.class_start_time}
                  {' - '}
                  {offering.class_end_time}
                </p>

              </div>

              <button
                onClick={() => setIsEnrollOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Plus className="h-4 w-4 inline" />
                {' '}
                Enroll
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ================= MODAL ================= */}
      {isEnrollOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96 space-y-4">

            <h2 className="text-xl font-bold">
              Enroll with Course Code
            </h2>

            <input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter course code (CS101)"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setIsEnrollOpen(false)}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleEnroll}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}