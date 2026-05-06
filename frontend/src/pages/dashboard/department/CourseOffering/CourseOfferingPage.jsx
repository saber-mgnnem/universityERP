'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/dep-form-modal';
import { Plus } from 'lucide-react';

import API from '@/services/api';

export default function CourseOfferingPage() {

  const [offerings, setOfferings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔄 LOAD DATA
  useEffect(() => {
    fetchOfferings();
    fetchCourses();
    fetchProfessors();
    fetchSemesters();
  }, []);

  const fetchOfferings = async () => {
    const res = await API.get('/course-offerings');
    setOfferings(res.data);
    console.log(res.data)

  };

  const fetchCourses = async () => {
    const res = await API.get('/courses');
    setCourses(res.data);
  };

  const fetchProfessors = async () => {
    const res = await API.get('/professors');
    setProfessors(res.data);
  };

  const fetchSemesters = async () => {
    const res = await API.get('/current-semesters');
    setSemesters(res.data);
  };

  // ➕ CREATE
  const handleAdd = async (formData) => {
    await API.post('/course-offerings', {
      course_id: formData.course_id,
      semester_id: formData.semester_id,
      instructor_id: formData.instructor_id,
      classroom_location: formData.classroom_location,
      course_schedule_day: formData.course_schedule_day,
      class_start_time: formData.class_start_time,
      class_end_time: formData.class_end_time,
      capacity: Number(formData.capacity),
    });

    setIsModalOpen(false);
    fetchOfferings();
  };

  // 📊 TABLE
  const columns = [
    {
      key: 'course',
      label: 'Course',
      render: (row) => row.course?.course_title || '—'
    },
    {
      key: 'semester',
      label: 'Semester',
      render: (row) => row.semester?.semester_name || '—'
    },
    {
      key: 'instructor',
      label: 'Instructor',
      render: (row) =>
        row.instructor
          ? row.instructor.first_name + ' ' + row.instructor.last_name
          : '—'
    },
    { key: 'course_schedule_day', label: 'Day' },
    { key: 'class_start_time', label: 'Start' },
    { key: 'class_end_time', label: 'End' },
    { key: 'classroom_location', label: 'Room' },
    { key: 'capacity', label: 'Capacity' },
  ];

  // 🧾 FORM
  const formFields = [
    {
      name: 'course_id',
      label: 'Course',
      type: 'select',
      required: true,
      options: courses.map(c => ({
        label: c.course_title,
        value: c.id
      }))
    },
    {
      name: 'semester_id',
      label: 'Semester',
      type: 'select',
      required: true,
      options: semesters.map(s => ({
        label: s.semester_name,
        value: s.id
      }))
    },
    {
      name: 'instructor_id',
      label: 'Professor',
      type: 'select',
      required: true,
      options: professors.map(p => ({
        label: p.first_name + ' ' + p.last_name,
        value: p.id
      }))
    },
    { name: 'course_schedule_day', label: 'Day', required: true },
    { name: 'class_start_time', label: 'Start Time', type: 'time', required: true },
    { name: 'class_end_time', label: 'End Time', type: 'time', required: true },
    { name: 'classroom_location', label: 'Room', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', required: true },
  ];

  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Course Offerings</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Add Offering
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat title="Total Offerings" value={offerings.length} />
          <Stat title="Total Capacity" value={sum(offerings, 'capacity')} />
          <Stat title="Rooms Used" value={new Set(offerings.map(o => o.classroom_location)).size} />
          <Stat title="Days Scheduled" value={new Set(offerings.map(o => o.course_schedule_day)).size} />
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={offerings}
          searchable
          pagination
        />

      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Course Offering"
        fields={formFields}
        onSubmit={handleAdd}
      />
    </main>
  );
}

// helpers
function sum(arr, key) {
  return arr.reduce((acc, i) => acc + Number(i[key] || 0), 0);
}

function Stat({ title, value }) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}