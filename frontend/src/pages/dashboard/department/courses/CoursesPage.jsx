'use client';

import { useEffect, useState } from 'react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/dep-form-modal';
import StatusBadge from '@/components/dashboard/status-badge';
import { Plus } from 'lucide-react';

import { getCourses, createCourse } from '@/services/courseService';
import { getDepartments } from '@/services/departmentService';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔄 LOAD DATA
  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();

    // 🔥 transform backend → frontend
    const formatted = data.map((c) => ({
      id: c.id,
      code: c.course_code,
      title: c.course_title,
      instructor: c.department?.department_name || '-',
      credits: c.credit_hours,
      enrolled: 0,
      capacity: c.max_enrollment,
      status: c.is_active ? 'active' : 'inactive',
    }));

    setCourses(formatted);
  };

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data || []);
  };

  // ➕ CREATE COURSE
  const handleAddCourse = async (formData) => {
    await createCourse({
      course_code: formData.code,
      course_title: formData.title,
      department_id: formData.department_id,
      credit_hours: Number(formData.credits),
      max_enrollment: Number(formData.capacity),
      course_level: formData.level,
    });

    setIsModalOpen(false);
    fetchCourses();
  };

  // 📊 TABLE COLUMNS
  const columns = [
    { key: 'code', label: 'Course Code' },
    { key: 'title', label: 'Title' },
    { key: 'instructor', label: 'Department' },
    { key: 'credits', label: 'Credits' },
    { key: 'enrolled', label: 'Enrolled' },
    { key: 'capacity', label: 'Capacity' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  // 🧾 FORM FIELDS
  const formFields = [
    { name: 'code', label: 'Course Code', required: true },
    { name: 'title', label: 'Course Title', required: true },

    {
      name: 'department_id',
      label: 'Department',
      type: 'select',
      required: true,
      options: (departments || []).map((d) => ({
        label: d.department_name,
        value: d.id,
      })),
    },

    { name: 'credits', label: 'Credits', type: 'number', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', required: true },

    {
      name: 'level',
      label: 'Level',
      type: 'select',
      options: ['100', '200', '300', '400'],
      required: true,
    },
  ];

  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Course Management</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add Course
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat title="Total Courses" value={courses.length} />
          <Stat
            title="Total Enrollment"
            value={courses.reduce((sum, c) => sum + c.enrolled, 0)}
          />
          <Stat
            title="Total Capacity"
            value={courses.reduce((sum, c) => sum + c.capacity, 0)}
          />
          <Stat title="Avg Utilization" value={calculateUtilization(courses)} />
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={courses}
          searchable={true}
          pagination={true}
        />
      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Course"
        fields={formFields}
        onSubmit={handleAddCourse}
      />
    </main>
  );
}

// 📊 helpers
function Stat({ title, value }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function calculateUtilization(courses) {
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const totalCapacity = courses.reduce((sum, c) => sum + c.capacity, 0);

  if (!totalCapacity) return '0%';

  return Math.round((totalEnrolled / totalCapacity) * 100) + '%';
}