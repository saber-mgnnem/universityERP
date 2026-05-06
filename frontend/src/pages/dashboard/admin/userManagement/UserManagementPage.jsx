'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/userService';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // =========================
  // LOAD USERS
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }

      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // EDIT USER
  // =========================
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },

    {
      key: 'roles',
      label: 'Role',
      render: (roles) => roles?.[0]?.role_code || 'N/A',
    },

    {
      key: 'is_active',
      label: 'Status',
      render: (val) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            val ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {val ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  // =========================
  // FORM (ROLE ONLY IN CREATE)
  // =========================
  const getFormFields = (editingUser) => [
    { name: 'first_name', label: 'First Name', required: true },
    { name: 'last_name', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },

    // PASSWORD ONLY FOR CREATE
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: !editingUser,
    },

    // ROLE ONLY FOR CREATE
    ...(editingUser
      ? []
      : [
          {
            name: 'role_code',
            label: 'Role',
            type: 'select',
            options: [
              'admin',
              'student',
              'professor',
              'hr_manager',
              'rector',
              'department',
            ],
            required: true,
          },
        ]),

    {
      name: 'is_active',
      label: 'Status',
      type: 'select',
      options: ['1', '0'],
      required: true,
    },
  ];

  return (
    <main className="p-8">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Management</h1>

          <button
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add User
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={users}
          actions={[
            { label: 'Edit', onClick: handleEdit },
            { label: 'Delete', onClick: handleDelete, variant: 'danger' },
          ]}
          searchable={true}
          pagination={true}
        />
      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Edit User' : 'Add User'}
        fields={getFormFields(editingUser)}
        initialData={editingUser}
        onSubmit={handleSubmit}
      />
    </main>
  );
}