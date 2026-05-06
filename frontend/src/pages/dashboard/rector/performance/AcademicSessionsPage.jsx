'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';

import {
  getSessions,
  createSession,
  deleteSession
} from '@/services/sessionService';

export default function AcademicSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  // ➕ CREATE
  const handleAdd = async (formData) => {
    await createSession({
      session_name: formData.session_name,
      session_year: Number(formData.session_year),
      session_start_date: formData.session_start_date,
      session_end_date: formData.session_end_date,
      semester_count: Number(formData.semester_count || 2),
      is_current_session: Number(formData.is_current_session || 0),
      is_active: Number(formData.is_active || 1),
    });

    setIsModalOpen(false);
    fetchSessions();
  };

  // ❌ DELETE
  const handleDelete = async (row) => {
    await deleteSession(row.id);
    fetchSessions();
  };

  // 📊 TABLE
  const columns = [
    { key: 'session_name', label: 'Session' },
    { key: 'session_year', label: 'Year' },
    { key: 'session_start_date', label: 'Start' },
    { key: 'session_end_date', label: 'End' },
    { key: 'semester_count', label: 'Semesters' },
    {
      key: 'is_current_session',
      label: 'Current',
      render: (val) => val ? 'Yes' : 'No'
    },
  ];

  // 🧾 FORM
  const formFields = [
    { name: 'session_name', label: 'Session Name', required: true },
    { name: 'session_year', label: 'Year', type: 'number', required: true },

    { name: 'session_start_date', label: 'Start Date', type: 'date', required: true },
    { name: 'session_end_date', label: 'End Date', type: 'date', required: true },

    { name: 'semester_count', label: 'Semesters', type: 'number' },

    {
      name: 'is_current_session',
      label: 'Current Session',
      type: 'select',
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    },

    {
      name: 'is_active',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 0 }
      ]
    }
  ];

  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Academic Sessions</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Add Session
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat title="Total Sessions" value={sessions.length} />
          <Stat title="Active" value={sessions.filter(s => s.is_active).length} />
          <Stat title="Current" value={sessions.filter(s => s.is_current_session).length} />
          <Stat title="Total Semesters" value={sum(sessions, 'semester_count')} />
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={sessions}
          actions={[
            { label: 'Delete', onClick: handleDelete, variant: 'danger' }
          ]}
          searchable
          pagination
        />

      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Academic Session"
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