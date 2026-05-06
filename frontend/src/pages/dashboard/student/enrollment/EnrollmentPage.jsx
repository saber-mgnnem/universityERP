'use client';

import { useEffect, useState, useMemo } from 'react';
import { Plus, Minus } from 'lucide-react';
import API from '@/services/api';

export default function EnrollmentPage() {
  const [offerings, setOfferings] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: missing state (IMPORTANT)
  const [courseCode, setCourseCode] = useState('');

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchOfferings();
    fetchEnrollments();
  }, []);

  const fetchOfferings = async () => {
    try {
      const res = await API.get('/student-offerings');
      setOfferings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await API.get('/enrollments');
      setEnrolled(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ENROLL (BY COURSE CODE)
  // =========================
  const handleEnroll = async () => {
    try {
      if (!courseCode.trim()) {
        alert("Course code is required");
        return;
      }

      await API.post('/enrollments', {
        course_code: courseCode.trim(),
      });

      setIsEnrollOpen(false);
      setCourseCode('');

      fetchEnrollments();
      fetchOfferings();
    } catch (err) {
      alert(err.response?.data?.error || 'Enrollment failed');
    }
  };

  // =========================
  // DROP
  // =========================
  const handleDrop = async (id) => {
    try {
      await API.delete(`/enrollments/${id}`);
      fetchEnrollments();
      fetchOfferings();
    } catch (err) {
      alert('Failed to drop course');
    }
  };

  // =========================
  // FILTER AVAILABLE
  // =========================
  const enrolledIds = useMemo(() => {
    return new Set(enrolled.map(e => e.course_offering_id));
  }, [enrolled]);

  const availableOfferings = useMemo(() => {
    return offerings.filter(o => !enrolledIds.has(o.id));
  }, [offerings, enrolledIds]);

  // =========================
  // LOADING
  // =========================
  if (loading) return <div className="p-8">Loading...</div>;

  // helper
  const getOffering = (e) => e.courseOffering || e.course_offering;

  return (
    <main className="p-8 space-y-10">

      <h1 className="text-3xl font-bold">Student Enrollment</h1>

      {/* ================= MY COURSES ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          My Courses ({enrolled.length})
        </h2>

        <div className="space-y-3">
          {enrolled.map((enroll) => {
            const offering = getOffering(enroll);

            return (
              <div key={enroll.id} className="flex justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">
                    {offering?.course?.course_code} - {offering?.course?.course_title}
                  </p>
                </div>

                <button
                  onClick={() => handleDrop(enroll.id)}
                  className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg"
                >
                  <Minus className="h-4 w-4 inline" /> Drop
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= AVAILABLE ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Available Courses
        </h2>

        <div className="space-y-3">
          {availableOfferings.map((offering) => (
            <div key={offering.id} className="flex justify-between p-4 border rounded-lg">

              <div>
                <p className="font-semibold">
                  {offering.course?.course_code} - {offering.course?.course_title}
                </p>
              </div>

              <button
                onClick={() => setIsEnrollOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Plus className="h-4 w-4 inline" /> Enroll
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {isEnrollOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">

            <h2 className="text-xl font-bold">Enroll with Course Code</h2>

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