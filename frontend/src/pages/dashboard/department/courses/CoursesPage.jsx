'use client';

import { useEffect, useState } from 'react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/dep-form-modal';
import StatusBadge from '@/components/dashboard/status-badge';

import { Button } from '@/components/ui/button';

import {
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/services/courseService';

import { getDepartments } from '@/services/departmentService';

export default function CoursesPage() {

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCourse, setEditingCourse] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {

      const data = await getCourses();

      const formatted = data.map((c) => ({
        id: c.id,

        code: c.course_code,
        title: c.course_title,

        department_id: c.department_id,

        instructor: c.department?.department_name || '-',

        credits: c.credit_hours,

        enrolled: 0,

        capacity: c.max_enrollment,

        coefficient: c.coefficient,

        status: c.is_active ? 'active' : 'inactive',
      }));

      setCourses(formatted);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {

      const data = await getDepartments();

      setDepartments(data || []);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (formData) => {

    try {

      const payload = {
        course_code: formData.code,
        course_title: formData.title,
        department_id: Number(formData.department_id),
        credit_hours: Number(formData.credits),
        max_enrollment: Number(formData.capacity),
        coefficient: formData.coefficient,
      };

      // UPDATE
      if (editingCourse) {

        await updateCourse(editingCourse.id, payload);

      } else {

        // CREATE
        await createCourse(payload);
      }

      setIsModalOpen(false);

      setEditingCourse(null);

      fetchCourses();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (course) => {

    setEditingCourse({
      id: course.id,

      code: course.code,
      title: course.title,

      department_id: course.department_id,

      credits: course.credits,

      capacity: course.capacity,

      coefficient: course.coefficient,
    });

    setIsModalOpen(true);
  };

  // ================= DELETE =================
  const handleDelete = async (course) => {

    try {

      const confirmDelete = confirm(
        `Delete ${course.title} ?`
      );

      if (!confirmDelete) return;

      await deleteCourse(course.id);

      fetchCourses();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= TABLE =================
  const columns = [
    {
      key: 'code',
      label: 'Course Code',
    },

    {
      key: 'title',
      label: 'Title',
    },

    {
      key: 'instructor',
      label: 'Department',
    },

    {
      key: 'credits',
      label: 'Credits',
    },

    {
      key: 'enrolled',
      label: 'Enrolled',
    },

    {
      key: 'capacity',
      label: 'Capacity',
    },

    {
      key: 'coefficient',
      label: 'Coefficient',
    },

    {
      key: 'status',
      label: 'Status',

      render: (val) => (
        <StatusBadge status={val} />
      ),
    },

    // ================= ACTIONS =================
    {
      key: 'actions',
      label: 'Actions',

      render: (_, row) => {

        const course = row || _;

        return (
          <div className="flex gap-2">

            {/* EDIT */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(course)}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            {/* DELETE */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(course)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

          </div>
        );
      },
    },
  ];

  // ================= FORM =================
  const formFields = [
    {
      name: 'code',
      label: 'Course Code',
      required: true,
    },

    {
      name: 'title',
      label: 'Course Title',
      required: true,
    },

    {
      name: 'department_id',
      label: 'Department',
      type: 'select',

      required: true,

      options: departments.map((d) => ({
        label: d.department_name,
        value: d.id,
      })),
    },

    {
      name: 'credits',
      label: 'Credits',
      type: 'number',
      required: true,
    },

    {
      name: 'capacity',
      label: 'Capacity',
      type: 'number',
      required: true,
    },

    {
      name: 'coefficient',
      label: 'Coefficient',

      type: 'select',

      required: true,

      options: [
        { label: '1', value: '1' },
        { label: '1.5', value: '1.5' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
  ];

  return (
    <main className="p-8">

      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Course Management
          </h1>

          <button
            onClick={() => {
              setEditingCourse(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add Course
          </button>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <Stat
            title="Total Courses"
            value={courses.length}
          />

          <Stat
            title="Total Enrollment"
            value={courses.reduce(
              (sum, c) => sum + c.enrolled,
              0
            )}
          />

          <Stat
            title="Total Capacity"
            value={courses.reduce(
              (sum, c) => sum + c.capacity,
              0
            )}
          />

          <Stat
            title="Avg Utilization"
            value={calculateUtilization(courses)}
          />

        </div>

        {/* ================= TABLE ================= */}
        <DataTable
          columns={columns}
          data={courses}
          searchable={true}
          pagination={true}
        />

      </div>

      {/* ================= MODAL ================= */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}

        title={
          editingCourse
            ? 'Update Course'
            : 'Add New Course'
        }

        fields={formFields}

        initialData={editingCourse}

        onSubmit={handleSubmit}
      />

    </main>
  );
}

// ================= HELPERS =================
function Stat({ title, value }) {

  return (
    <div className="bg-card border border-border rounded-lg p-4">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

function calculateUtilization(courses) {

  const totalEnrolled = courses.reduce(
    (sum, c) => sum + c.enrolled,
    0
  );

  const totalCapacity = courses.reduce(
    (sum, c) => sum + c.capacity,
    0
  );

  if (!totalCapacity) return '0%';

  return (
    Math.round(
      (totalEnrolled / totalCapacity) * 100
    ) + '%'
  );
}