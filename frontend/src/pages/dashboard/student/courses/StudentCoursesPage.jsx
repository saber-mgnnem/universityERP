'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [materials, setMaterials] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [completed, setCompleted] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // ---------------- INIT ----------------
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await fetchCompleted();
    await fetchCourses();
  };

  // ---------------- FETCH COURSES + MATERIALS ----------------
  const fetchCourses = async () => {
    try {
      const res = await API.get('/student-offerings');
      const data = res.data || [];

      setCourses(data);

      const materialsMap = {};

      await Promise.all(
        data.map(async (course) => {
          try {
            const res = await API.get(`/student/courses/${course.id}/materials`);
            materialsMap[course.id] = res.data || [];
          } catch {
            materialsMap[course.id] = [];
          }
        })
      );

      setCourseMaterials(materialsMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH COMPLETED ----------------
  const fetchCompleted = async () => {
    try {
      const res = await API.get('/student/materials/completed');

      const map = {};
      res.data.forEach((id) => {
        map[id] = true;
      });

      setCompleted(map);
    } catch (err) {
      console.error("Completed fetch error:", err);
    }
  };

  // ---------------- GROUP BY WEEK ----------------
  const groupByWeek = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const week = item.week_number || 1;
      if (!grouped[week]) grouped[week] = [];
      grouped[week].push(item);
    });
    return grouped;
  };

  // ---------------- OPEN COURSE ----------------
  const openMaterials = (offering) => {
    setSelectedCourse(offering);

    const mats = courseMaterials[offering.id] || [];
    const grouped = groupByWeek(mats);

    setMaterials(grouped);

    const firstWeek = Object.keys(grouped)[0];
    setSelectedWeek(firstWeek);
  };

  // ---------------- COMPLETE ----------------
  const toggleComplete = async (id) => {
    try {
      await API.post(`/student/materials/${id}/complete`);

      setCompleted(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- COURSE PROGRESS ----------------
  const getCourseProgress = (courseId) => {
    const mats = courseMaterials[courseId] || [];

    if (!mats.length) return 0;

    const done = mats.filter(m => completed[m.id]).length;

    return Math.round((done / mats.length) * 100);
  };

  // ---------------- WEEK PROGRESS ----------------
  const getWeekProgress = (week) => {
    const mats = materials[week] || [];
    if (!mats.length) return 0;

    const done = mats.filter(m => completed[m.id]).length;
    return Math.round((done / mats.length) * 100);
  };

  // ---------------- LOCK ----------------
  const isWeekLocked = (week) => {
    const weeks = Object.keys(materials).sort((a, b) => a - b);
    const index = weeks.indexOf(String(week));

    if (index === 0) return false;

    const prev = weeks[index - 1];
    return getWeekProgress(prev) < 100;
  };

  // ---------------- HELPERS ----------------
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    return url.replace("watch?v=", "embed/");
  };

  const weekData = materials[selectedWeek] || [];

  const getProgressColor = (p) => {
    if (p === 100) return 'bg-green-600';
    if (p > 50) return 'bg-yellow-500';
    return 'bg-blue-600';
  };

  // ---------------- LOADING ----------------
  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">My Courses</h1>

      {/* ================= COURSES ================= */}
      <div className="grid gap-4">
        {courses.map((item) => {
          const progress = getCourseProgress(item.id);

          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                  {item.course?.course_code} - {item.course?.course_title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p>{item.course_schedule_day}</p>
                <p>{item.class_start_time} - {item.class_end_time}</p>

                {/* ✅ PROGRESS */}
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">
                    Progress: {progress}%
                  </p>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className={`${getProgressColor(progress)} h-2 rounded transition-all`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Button
                  className="mt-3"
                  onClick={() => openMaterials(item)}
                >
                  Open Course
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl p-6 flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selectedCourse.course?.course_title}
              </h2>
              <button onClick={() => setSelectedCourse(null)}>✕</button>
            </div>

            {/* WEEK TABS */}
            <div className="flex gap-2 flex-wrap mb-4">
              {Object.keys(materials).map((week) => {
                const locked = isWeekLocked(week);
                const progress = getWeekProgress(week);

                return (
                  <button
                    key={week}
                    disabled={locked}
                    onClick={() => setSelectedWeek(week)}
                    className={`px-3 py-1 border rounded text-sm ${
                      selectedWeek == week ? 'bg-black text-white' : ''
                    } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Week {week} ({progress}%)
                  </button>
                );
              })}
            </div>

            {/* MATERIALS */}
            <div className="flex-1 overflow-y-auto space-y-4">

              {weekData.map((mat) => (
                <div key={mat.id} className="border rounded p-4 space-y-3">

                  {/* TITLE */}
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{mat.material_title}</p>
                      <p className="text-sm text-gray-500">{mat.material_type}</p>
                    </div>

                    <button
                      onClick={() => toggleComplete(mat.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        completed[mat.id]
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      {completed[mat.id] ? 'Done' : 'Mark as done'}
                    </button>
                  </div>

                  {/* PDF */}
                  {mat.file_url && (
                    <iframe
                      src={`${API_URL}${mat.file_url}`}
                      className="w-full h-[85vh] border rounded"
                    />
                  )}

                  {/* VIDEO */}
                  {mat.external_link_url && (
                    <iframe
                      src={getYoutubeEmbed(mat.external_link_url)}
                      className="w-full h-[85vh] border rounded"
                      allowFullScreen
                    />
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}