'use client';

import { useEffect, useState } from 'react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/dep-form-modal';

import { Plus } from 'lucide-react';

import API from '@/services/api';

export default function CourseOfferingPage() {

  const [offerings, setOfferings] = useState([]);

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [professors, setProfessors] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // ✅ selected department
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // ✅ modal form state
  const [formData, setFormData] = useState({
    department_filter: '',
    course_id: '',
    semester_id: '',
    instructor_id: '',
    classroom_location: '',
    course_schedule_day: '',
    class_start_time: '',
    class_end_time: '',
    capacity: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchOfferings();
    fetchCourses();
    fetchDepartments();
    fetchProfessors();
    fetchSemesters();
  }, []);

  // ================= FILTER COURSES =================
  useEffect(() => {

    if (!selectedDepartment) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(
      (course) =>
        Number(course.department_id) === Number(selectedDepartment)
    );

    setFilteredCourses(filtered);

  }, [selectedDepartment, courses]);

  // ================= FETCH OFFERINGS =================
  const fetchOfferings = async () => {
    try {

      const res = await API.get('/course-offerings');

      setOfferings(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {

      const res = await API.get('/courses');

      setCourses(res.data);
      setFilteredCourses(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {

      // ✅ FIXED TYPO
      const res = await API.get('/dedepartments');

      setDepartments(res.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH PROFESSORS =================
  const fetchProfessors = async () => {
    try {

      const res = await API.get('/professors');

      setProfessors(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH SEMESTERS =================
  const fetchSemesters = async () => {
    try {

      const res = await API.get('/current-semesters');

      setSemesters(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= HANDLE INPUT =================
  const handleInputChange = (name, value) => {

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // ✅ department selected
    if (name === 'department_filter') {

      setSelectedDepartment(value);

      // reset selected course
      setFormData((prev) => ({
        ...prev,
        course_id: ''
      }));
    }
  };

  // ================= CREATE =================
  const handleAdd = async () => {

    try {

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

      // reset form
      setFormData({
        department_filter: '',
        course_id: '',
        semester_id: '',
        instructor_id: '',
        classroom_location: '',
        course_schedule_day: '',
        class_start_time: '',
        class_end_time: '',
        capacity: '',
      });

      setSelectedDepartment('');

      fetchOfferings();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= TABLE =================
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
    {
      key: 'course_schedule_day',
      label: 'Day'
    },
    {
      key: 'class_start_time',
      label: 'Start'
    },
    {
      key: 'class_end_time',
      label: 'End'
    },
    {
      key: 'classroom_location',
      label: 'Room'
    },
    {
      key: 'capacity',
      label: 'Capacity'
    },
  ];

  return (
    <main className="p-8">

      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Course Offerings
          </h1>

          <button
            onClick={() => {

              setIsModalOpen(true);

              setSelectedDepartment('');

              setFilteredCourses(courses);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Add Offering
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <Stat
            title="Total Offerings"
            value={offerings.length}
          />

          <Stat
            title="Total Capacity"
            value={sum(offerings, 'capacity')}
          />

          <Stat
            title="Rooms Used"
            value={
              new Set(
                offerings.map(
                  (o) => o.classroom_location
                )
              ).size
            }
          />

          <Stat
            title="Days Scheduled"
            value={
              new Set(
                offerings.map(
                  (o) => o.course_schedule_day
                )
              ).size
            }
          />

        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={offerings}
          searchable
          pagination
        />

      </div>

      {/* ================= CUSTOM MODAL ================= */}
      {isModalOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-background rounded-lg p-6 w-full max-w-lg space-y-4">

            <h2 className="text-2xl font-bold">
              Create Course Offering
            </h2>

            {/* DEPARTMENT */}
            <div>
              <label className="block mb-1 font-medium">
                Department
              </label>

              <select
                className="w-full border rounded-lg p-2"
                value={formData.department_filter}
                onChange={(e) =>
                  handleInputChange(
                    'department_filter',
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((d) => (
                  <option
                    key={d.id}
                    value={d.id}
                  >
                    {d.department_name}
                  </option>
                ))}
              </select>
            </div>

            {/* COURSE */}
            <div>
              <label className="block mb-1 font-medium">
                Course
              </label>

              <select
                className="w-full border rounded-lg p-2"
                value={formData.course_id}
                onChange={(e) =>
                  handleInputChange(
                    'course_id',
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Course
                </option>

                {filteredCourses.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.course_title}
                  </option>
                ))}
              </select>
            </div>

            {/* SEMESTER */}
            <div>
              <label className="block mb-1 font-medium">
                Semester
              </label>

              <select
                className="w-full border rounded-lg p-2"
                value={formData.semester_id}
                onChange={(e) =>
                  handleInputChange(
                    'semester_id',
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Semester
                </option>

                {semesters.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                  >
                    {s.semester_name}
                  </option>
                ))}
              </select>
            </div>

            {/* PROFESSOR */}
            <div>
              <label className="block mb-1 font-medium">
                Professor
              </label>

              <select
                className="w-full border rounded-lg p-2"
                value={formData.instructor_id}
                onChange={(e) =>
                  handleInputChange(
                    'instructor_id',
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Professor
                </option>

                {professors.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.first_name} {p.last_name}
                  </option>
                ))}
              </select>
            </div>

            {/* DAY */}
            <input
              type="text"
              placeholder="Day"
              className="w-full border rounded-lg p-2"
              value={formData.course_schedule_day}
              onChange={(e) =>
                handleInputChange(
                  'course_schedule_day',
                  e.target.value
                )
              }
            />

            {/* START */}
            <input
              type="time"
              className="w-full border rounded-lg p-2"
              value={formData.class_start_time}
              onChange={(e) =>
                handleInputChange(
                  'class_start_time',
                  e.target.value
                )
              }
            />

            {/* END */}
            <input
              type="time"
              className="w-full border rounded-lg p-2"
              value={formData.class_end_time}
              onChange={(e) =>
                handleInputChange(
                  'class_end_time',
                  e.target.value
                )
              }
            />

            {/* ROOM */}
            <input
              type="text"
              placeholder="Room"
              className="w-full border rounded-lg p-2"
              value={formData.classroom_location}
              onChange={(e) =>
                handleInputChange(
                  'classroom_location',
                  e.target.value
                )
              }
            />

            {/* CAPACITY */}
            <input
              type="number"
              placeholder="Capacity"
              className="w-full border rounded-lg p-2"
              value={formData.capacity}
              onChange={(e) =>
                handleInputChange(
                  'capacity',
                  e.target.value
                )
              }
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Create
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

// ================= HELPERS =================
function sum(arr, key) {

  return arr.reduce(
    (acc, i) => acc + Number(i[key] || 0),
    0
  );
}

function Stat({ title, value }) {

  return (
    <div className="bg-card border rounded-lg p-4">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}