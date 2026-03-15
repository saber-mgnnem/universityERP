'use client';

import { useState } from 'react';
import { Upload, File, Trash2, Download } from 'lucide-react';

import FormModal from '@/components/dashboard/form-modal';

const mockMaterials = [
  { id: 1, name: 'Lecture 1 - Introduction', type: 'PDF', size: '4.2MB', course: 'CS101', uploadDate: '2024-02-10' },
  { id: 2, name: 'Python Basics Exercise', type: 'ZIP', size: '2.1MB', course: 'CS101', uploadDate: '2024-02-09' },
  { id: 3, name: 'Assignment 1 - Solution', type: 'PDF', size: '1.8MB', course: 'CS101', uploadDate: '2024-02-08' },
  { id: 4, name: 'Lab Session 2', type: 'VIDEO', size: '125MB', course: 'CS101', uploadDate: '2024-02-07' },
  { id: 5, name: 'Data Structures Notes', type: 'PDF', size: '5.3MB', course: 'CS201', uploadDate: '2024-02-06' },
];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState(mockMaterials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const handleUpload = (formData) => {
    console.log('Material uploaded:', formData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const filteredMaterials = selectedCourse === 'all' 
    ? materials 
    : materials.filter(m => m.course === selectedCourse);

  const formFields = [
    { name: 'course', label: 'Course', type: 'select', options: ['CS101', 'CS201', 'CS301'], required: true },
    { name: 'title', label: 'Material Title', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'file', label: 'Upload File', type: 'file', required: true },
  ];

  return (
  
        <main className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Course Materials</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Upload className="h-5 w-5" />
                Upload Material
              </button>
            </div>

            <div className="flex gap-2">
              {['all', 'CS101', 'CS201', 'CS301'].map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCourse === course
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {course === 'all' ? 'All Courses' : course}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-center gap-4 flex-1">
                    <File className="h-8 w-8 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold">{material.name}</p>
                      <p className="text-sm text-muted-foreground">{material.course} • {material.type} • {material.size} • {material.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition text-sm">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
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

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Storage Usage</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Used</span>
                    <span className="font-bold">385.5 MB / 1 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '38.55%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
