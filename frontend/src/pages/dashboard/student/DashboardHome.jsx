'use client';

import { useEffect, useState, useMemo } from "react";
import API from "@/services/api";
import { useNavigate } from 'react-router-dom';

import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  FileCheck,
  BarChart3,
  Calendar,
  Brain,
  BookOpen,
  Clock,
  CreditCard,
  TrendingUp
} from "lucide-react";

export default function DashboardHome() {
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  // ================= INIT =================
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const [gradesRes, coursesRes, timetableRes] = await Promise.all([
        API.get("/student/grades"),
        API.get("/enrollments"),
        API.get("/student-timetable"),
      ]);

      setGrades(gradesRes.data || []);
      setCourses(coursesRes.data || []);
      setTimetable(timetableRes.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= GPA CALC =================
  const gpa = useMemo(() => {
    if (!grades.length) return 0;

    const total = grades.reduce(
      (sum, g) => sum + (parseFloat(g.gpa_points) || 0),
      0
    );

    return (total / grades.length).toFixed(2);
  }, [grades]);

  // ================= STATS =================
  const stats = {
    gpa,
    credits: courses.length * 3, // fallback assumption
    courses: courses.length,
    assignments: 3, // you can connect later if you have endpoint
  };

  // ================= TODAY SCHEDULE =================
  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  const todaySchedule = useMemo(() => {
    const classes = timetable[today] || [];

    return classes.map((c) => ({
      time: c.time,
      course: c.code,
      topic: c.title || "Lecture",
      room: c.room,
    }));
  }, [timetable, today]);

  // ================= CURRENT COURSES =================
  const currentCourses = useMemo(() => {
    return courses.map((c) => ({
      code: c.course?.course_code,
      name: c.course?.course_title,
      grade:
        grades.find((g) => g.enrollment_id === c.id)?.letter_grade || "N/A",
      progress: Math.floor(Math.random() * 40 + 60), // replace if you add backend progress
    }));
  }, [courses, grades]);

  // ================= AI STATIC (can be backend later) =================
  const aiRecommendations = [
    "Consider taking CS201 next semester",
    "Improve Linear Algebra Chapter 5",
    "Explore Data Science career path",
  ];

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <main className="p-6 space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current GPA"
          value={stats.gpa}
          icon={TrendingUp}
        />
        <StatCard
          title="Credits Earned"
          value={stats.credits}
          icon={BookOpen}
        />
        <StatCard
          title="Courses This Sem"
          value={stats.courses}
          icon={Calendar}
        />
        <StatCard
          title="Assignments Due"
          value={stats.assignments}
          icon={Clock}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ================= COURSES ================= */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Your enrolled courses this semester</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {currentCourses.map((course, i) => (
                <div key={i} className="p-4 rounded bg-muted/50">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-bold">{course.code}</span>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                    </div>

                    <Badge>{course.grade}</Badge>
                  </div>

                  <div className="w-full bg-muted h-2 rounded">
                    <div
                      className="bg-primary h-2 rounded"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="text-xs mt-1 text-muted-foreground">
                    {course.progress}% complete
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ================= AI ADVISOR ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Advisor
            </CardTitle>
            <CardDescription>Personalized recommendations</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 border rounded bg-primary/5">
                  <p className="text-sm">{rec}</p>
                </div>
              ))}

              <Button className="w-full" onClick={() => navigate('/student/advisor')}>
                Chat with AI Advisor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= TODAY SCHEDULE ================= */}
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>{today}</CardDescription>
          </div>

          <Button variant="outline" onClick={() => navigate('/student/timetable')}>
            View Full Timetable
          </Button>
        </CardHeader>

        <CardContent>
          {todaySchedule.length === 0 ? (
            <p className="text-muted-foreground">
              No classes today
            </p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {todaySchedule.map((c, i) => (
                <div key={i} className="border p-4 rounded">
                  <Badge>{c.course}</Badge>
                  <p className="font-semibold mt-2">{c.topic}</p>
                  <p className="text-sm text-muted-foreground">{c.time}</p>
                  <p className="text-sm">{c.room}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid sm:grid-cols-4 gap-4">

        <Button onClick={() => navigate('/student/enrollment')} className="flex flex-col h-auto py-4">
          <FileCheck />
          Enroll Course
        </Button>

        <Button onClick={() => navigate('/student/grades')}  variant="outline" className="flex flex-col h-auto py-4">
          <BarChart3 />
          View Grades
        </Button>

        <Button   onClick={() => navigate('/student/payments')} variant="outline" className="flex flex-col h-auto py-4">
          <CreditCard />
          Pay Tuition
        </Button>

        <Button   onClick={() => navigate('/student/timetable')}
 variant="outline" className="flex flex-col h-auto py-4">
          <Calendar />
          Calendar
        </Button>


      </div>

    </main>
  );
}