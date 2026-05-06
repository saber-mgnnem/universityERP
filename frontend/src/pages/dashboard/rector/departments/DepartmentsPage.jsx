'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/dep-form-modal';
import { getUsers } from '@/services/userService';

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '@/services/departmentService';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [heads, setHeads] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    fetchDepartments();
    fetchHeads();
  }, []);

  const fetchHeads = async () => {
    try {
      const users = await getUsers();

      const filtered = users.filter(user =>
        user.roles?.some(role =>
          ['professor', 'department', 'rector'].includes(role.role_code)
        )
      );

      setHeads(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  // ======================
  // ADD / UPDATE
  // ======================
  const handleSubmit = async (formData) => {
    const payload = {
      department_name: formData.department_name,
      department_code: formData.department_code,
      description: formData.description,
      head_of_department_id: formData.head_of_department_id,
      faculty_count: Number(formData.faculty_count || 0),
      student_count: Number(formData.student_count || 0),
      budget_allocation: formData.budget_allocation,
      contact_email: formData.contact_email,
      contact_phone: formData.contact_phone,
      office_building: formData.office_building,
      office_room_number: formData.office_room_number,
      is_active: Number(formData.is_active ?? 1),
    };

    if (editingDepartment) {
      await updateDepartment(editingDepartment.id, payload);
    } else {
      await createDepartment(payload);
    }

    setIsModalOpen(false);
    setEditingDepartment(null);
    fetchDepartments();
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (row) => {
    await deleteDepartment(row.id);
    fetchDepartments();
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (row) => {
    setEditingDepartment(row);
    setIsModalOpen(true);
  };

  // ======================
  // TABLE COLUMNS
  // ======================
  const columns = [
    { key: 'department_name', label: 'Department Name' },
    {
      key: 'head',
      label: 'Department Head',
      render: (head) => head ? `${head.first_name} ${head.last_name}` : 'N/A',
    },
    { key: 'faculty_count', label: 'Faculty Members' },
    { key: 'student_count', label: 'Students' },
    { key: 'budget_allocation', label: 'Budget' },
  ];

  // ======================
  // FORM FIELDS
  // ======================
  const formFields = [
    { name: 'department_name', label: 'Department Name', required: true },
    { name: 'department_code', label: 'Department Code', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },

    {
      name: 'head_of_department_id',
      label: 'Head of Department',
      type: 'select',
      options: heads.map(h => ({
        label: `${h.first_name} ${h.last_name}`,
        value: h.id
      }))
    },

    { name: 'faculty_count', label: 'Faculty Count', type: 'number' },
    { name: 'student_count', label: 'Student Count', type: 'number' },
    { name: 'budget_allocation', label: 'Budget', type: 'number' },

    { name: 'contact_email', label: 'Contact Email', type: 'email' },
    { name: 'contact_phone', label: 'Phone' },

    { name: 'office_building', label: 'Building' },
    { name: 'office_room_number', label: 'Room Number' },

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
          <h1 className="text-3xl font-bold">Departments</h1>

          <button
            onClick={() => {
              setEditingDepartment(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Add Department
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={departments}
          actions={[
            { label: 'Edit', onClick: handleEdit },
            { label: 'Delete', onClick: handleDelete, variant: 'danger' },
          ]}
          searchable
          pagination
        />

      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDepartment(null);
        }}
        title={editingDepartment ? "Edit Department" : "Add Department"}
        fields={formFields}
        initialData={editingDepartment}
        onSubmit={handleSubmit}
      />
    </main>
  );
}