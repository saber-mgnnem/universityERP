'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import DataTable from '@/components/dashboard/data-table';
import FormModal from '@/components/dashboard/form-modal';
import ActionButtons from '@/components/dashboard/action-buttons';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@university.edu', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@university.edu', role: 'Rector', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike@university.edu', role: 'Professor', status: 'active', joinDate: '2023-03-10' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@university.edu', role: 'Student', status: 'inactive', joinDate: '2023-04-05' },
  { id: 5, name: 'Robert Brown', email: 'robert@university.edu', role: 'HR', status: 'active', joinDate: '2023-05-12' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-xs font-semibold ${val === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{val}</span> },
    { key: 'joinDate', label: 'Join Date' },
  ];

  const handleAddUser = (formData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id } : u));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    setUsers(users.filter(u => u.id !== user.id));
  };

  const formFields = [
    { name: 'name', label: 'Full Name', placeholder: 'Enter full name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
    { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Rector', 'Department Head', 'Professor', 'Student', 'HR', 'Finance'], required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], required: true },
  ];

  return (
        <main className="p-8">
          <div className="space-y-6">
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

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        fields={formFields}
        onSubmit={handleAddUser}
      />
        </main>

  );
}
