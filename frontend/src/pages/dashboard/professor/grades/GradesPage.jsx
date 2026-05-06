'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import { Upload } from 'lucide-react';

export default function GradesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= COURSES =================
  const fetchCourses = async () => {
    const res = await API.get('/professor/offerings');
    setCourses(res.data);
  };

  // ================= ENROLLMENTS =================
  const fetchEnrollments = async (courseId) => {
    const res = await API.get(`/enrollments?course_offering_id=${courseId}`);
    setEnrollments(res.data);
  };

  // ================= GRADES =================
  const fetchGrades = async (courseId) => {
    const res = await API.get(`/grades?course_offering_id=${courseId}`);
    setGrades(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchEnrollments(selectedCourse);
      fetchGrades(selectedCourse);
    }
  }, [selectedCourse]);

  // ================= SUBMIT =================
  const handleSubmitGrades = async (formData) => {
    await API.post('/grades', {
      enrollment_id: formData.enrollment_id,
      ca: formData.ca,
      midterm: formData.midterm,
      final: formData.final,
    });

    fetchGrades(selectedCourse);
    setIsModalOpen(false);
  };

  // ================= COLUMNS =================
  const columns = [
    {
      key: 'student',
      label: 'Student',
      render: (val, row) =>
        row.enrollment?.student?.first_name +
        ' ' +
        row.enrollment?.student?.last_name,
    },
    { key: 'midterm_exam_marks', label: 'Midterm' },
    { key: 'final_exam_marks', label: 'Final' },
    { key: 'total_marks_obtained', label: 'Total' },
  ];

  // ================= FORM =================
  const formFields = [
    {
      name: 'enrollment_id',
      label: 'Student',
      type: 'select',
      options: enrollments.map((e) => ({
        value: e.id,
        label: e.student?.first_name + ' ' + e.student?.last_name,
      })),
      required: true,
    },
    { name: 'ca', label: 'CA', type: 'number' },
    { name: 'midterm', label: 'Midterm', type: 'number' },
    { name: 'final', label: 'Final', type: 'number' },
  ];

  return (
    <main className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">Grade Management</h1>

      {/* COURSE BUTTONS */}
      <div className="flex gap-2 flex-wrap">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourse(c.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedCourse === c.id
                ? 'bg-primary text-white'
                : 'bg-muted'
            }`}
          >
            {c.course?.course_code}
          </button>
        ))}
      </div>

      {/* EMPTY STATES */}
      {!selectedCourse && (
        <p className="text-center text-muted-foreground">
          Select a class to view grades
        </p>
      )}

      {selectedCourse && enrollments.length === 0 && (
        <p className="text-center text-muted-foreground">
          No enrolled students in this class yet
        </p>
      )}

      {/* TABLE */}
      {selectedCourse && enrollments.length > 0 && (
        <DataTable columns={columns} data={grades} searchable pagination />
      )}

      {/* BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
      >
        <Upload className="h-5 w-5" />
        Add Grade
      </button>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Grade"
        fields={formFields}
        onSubmit={handleSubmitGrades}
      />
    </main>
  );
}