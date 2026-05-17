'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import DataTable from '@/components/dashboard/DataTable';

export default function StudentGradesPage() {

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {

    try {

      const res = await API.get('/student/grades');
       console.log(res.data)
      setGrades(res.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const columns = [

    {
      key: 'course',
      label: 'Course',
      render: (_, row) => (
        <>
          {row.enrollment.course_offering.course.course_code}
          {' - '}
          {row.enrollment?.course_offering?.course?.course_title}
        </>
      )
    },

    {
      key: 'continuous_assessment_marks',
      label: 'CA'
    },

    {
      key: 'midterm_exam_marks',
      label: 'Midterm'
    },

    {
      key: 'final_exam_marks',
      label: 'Final'
    },

    {
      key: 'total_marks_obtained',
      label: 'Total'
    },

    {
      key: 'letter_grade',
      label: 'Grade'
    },

    {
      key: 'gpa_points',
      label: 'GPA'
    },

    {
      key: 'grade_status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            value === 'Pass'
              ? 'bg-green-600'
              : 'bg-red-600'
          }`}
        >
          {value}
        </span>
      )
    }

  ];

  if (loading) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );

  }

  return (

    <main className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        My Grades
      </h1>

      <DataTable
        columns={columns}
        data={grades}
      />

    </main>

  );
}