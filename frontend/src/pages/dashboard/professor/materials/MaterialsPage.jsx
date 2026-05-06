'use client';

import { useEffect, useState } from 'react';
import { Upload, File, Trash2, Download } from 'lucide-react';
import API from '@/services/api';
import FormModal from '@/components/dashboard/form-modal';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await API.get('/professor/offerings');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  // ================= FETCH MATERIALS =================
  const fetchMaterials = async (offeringId = null) => {
    try {
      if (!offeringId) {
        setMaterials([]);
        return;
      }

      const res = await API.get(`/materials/${offeringId}`);
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  // ================= FETCH ALL MATERIALS =================
  const fetchAllMaterials = async () => {
    try {
      const res = await API.get('/materials');
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching all materials:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse === 'all') {
      fetchAllMaterials();
    } else {
      fetchMaterials(selectedCourse);
    }
  }, [selectedCourse]);

  // ================= UPLOAD =================
const handleUpload = async (formData) => {
  try {
    const data = new FormData();

    data.append('course_offering_id', selectedCourse);
    data.append('material_title', formData.title);
    data.append('material_type', formData.material_type);
    data.append('material_description', formData.description || '');
    data.append('week_number', formData.week_number || '');

    // ✅ FIXED FILE CHECK
    if (formData.file?.name) {
      data.append('file', formData.file);
    }

    if (formData.external_link_url) {
      data.append('external_link_url', formData.external_link_url);
    }

    await API.post('/materials', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    fetchMaterials(selectedCourse);
    setIsModalOpen(false);

  } catch (err) {
    console.error('UPLOAD ERROR:', err.response?.data || err);
  }
};

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/materials/${id}`);

      if (selectedCourse === 'all') {
        fetchAllMaterials();
      } else {
        fetchMaterials(selectedCourse);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // ================= FORM =================
const formFields = [
  { name: 'title', label: 'Material Title', required: true },

  {
    name: 'material_type',
    label: 'Material Type',
    type: 'select',
    required: true,
    options: [
      'Lecture Notes',
      'Video',
      'Article',
      'Book',
      'Code',
      'Other'
    ]
  },

  {
    name: 'week_number',
    label: 'Week Number',
    type: 'number'
  },

  {
    name: 'external_link_url',
    label: 'External Link (YouTube, etc)',
    type: 'text'
  },

  {
    name: 'description',
    label: 'Description',
    type: 'textarea'
  },

  {
    name: 'file',
    label: 'Upload File',
    type: 'file'
  },
];
  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Course Materials</h1>

          <button
            onClick={() => {
              if (selectedCourse === 'all') {
                alert('Select a course first');
                return;
              }
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Upload className="h-5 w-5" />
            Upload Material
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCourse('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCourse === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            All Courses
          </button>

          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCourse === course.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {course.course?.course_code}
            </button>
          ))}
        </div>

        {/* MATERIAL LIST */}
        <div className="space-y-3">

          {materials.length === 0 && (
            <div className="text-muted-foreground text-center p-6 border rounded">
              No materials found
            </div>
          )}

          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-4 flex-1">
                <File className="h-8 w-8 text-primary" />

                <div className="flex-1">
                  <p className="font-semibold">{material.material_title}</p>

                  <p className="text-sm text-muted-foreground">
                    {material.course_offering?.course?.course_code || '-'} •{' '}
                    {material.material_type} • Week {material.week_number ?? '-'} •{' '}
                    {material.upload_date}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
              {material.file_url ? (
  <a
    href={material.file_url}
    target="_blank"
    className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg"
  >
    <Download className="h-4 w-4" />
    Download
  </a>
) : material.external_link_url ? (
  <a
    href={material.external_link_url}
    target="_blank"
    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
  >
    Open Link
  </a>
) : null}
                <button
                  onClick={() => handleDelete(material.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* STORAGE */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Storage Usage</h2>

          <div>
            <div className="flex justify-between mb-2">
              <span>Used</span>
              <span className="font-bold">
                {materials.length * 5} MB / 1 GB
              </span>
            </div>

            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: `${materials.length * 2}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Course Material"
        fields={formFields}
        onSubmit={handleUpload}
      />
    </main>
  );
}