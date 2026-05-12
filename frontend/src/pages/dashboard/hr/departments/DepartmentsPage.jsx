'use client';

import { useEffect, useState } from 'react';

import {
  Plus,
  Edit2,
  Trash2,
  Users,
  TrendingUp,
  Briefcase,
} from 'lucide-react';

import API from '@/services/api';

import FormModal from '@/components/dashboard/dep-form-modal';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DepartmentsPage() {

  // ================= STATES =================
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  // ================= AUTH =================
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {

      const res = await API.get(
        '/departments',
        authHeaders
      );

      setDepartments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {

      const res = await API.get(
        '/users',
        authHeaders
      );

      setUsers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  // ================= CREATE =================
  const handleCreateDepartment = async (data) => {
    try {

      await API.post(
        '/departments',
        data,
        authHeaders
      );

      fetchDepartments();

      setIsModalOpen(false);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE =================
  const handleUpdateDepartment = async (data) => {
    try {

      await API.put(
        `/departments/${selectedDepartment.id}`,
        data,
        authHeaders
      );

      fetchDepartments();

      setIsModalOpen(false);

      setSelectedDepartment(null);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDeleteDepartment = async (id) => {

    if (!confirm('Delete department ?'))
      return;

    try {

      await API.delete(
        `/departments/${id}`,
        authHeaders
      );

      fetchDepartments();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= FORM FIELDS =================
  const formFields = [

    {
      name: 'department_name',
      label: 'Department Name',
      type: 'text',
      required: true,
    },

    {
      name: 'department_code',
      label: 'Department Code',
      type: 'text',
      required: true,
    },

    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },

    {
      name: 'head_of_department_id',
      label: 'Head of Department',
      type: 'select',

      options: users.map((user) => ({
        value: user.id,
        label:
          `${user.first_name} ${user.last_name}`,
      })),
    },

    {
      name: 'faculty_count',
      label: 'Faculty Count',
      type: 'number',
    },

    {
      name: 'student_count',
      label: 'Student Count',
      type: 'number',
    },

    {
      name: 'budget_allocation',
      label: 'Budget Allocation',
      type: 'number',
    },

    {
      name: 'contact_email',
      label: 'Contact Email',
      type: 'email',
    },

    {
      name: 'contact_phone',
      label: 'Contact Phone',
      type: 'text',
    },

    {
      name: 'office_building',
      label: 'Office Building',
      type: 'text',
    },

    {
      name: 'office_room_number',
      label: 'Office Room',
      type: 'text',
    },

    {
  name: 'is_active',
  label: 'Active',
  type: 'select',

  options: [
    {
      value: 1,
      label: 'Active',
    },

    {
      value: 0,
      label: 'Inactive',
    },
  ],
},
  ];

  return (

    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Department Management
        </h1>

        <Button
          className="flex items-center gap-2"

          onClick={() => {
            setSelectedDepartment(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5" />
          Add Department
        </Button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">

        {departments.map((dept) => (

          <Card
            key={dept.id}
            className="border-border hover:shadow-lg transition-shadow"
          >

            {/* HEADER */}
            <CardHeader className="pb-3">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>

                  <div>

                    <CardTitle>
                      {dept.department_name}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">

                      Head:

                      {' '}

                      {dept.head
                        ? `${dept.head.first_name} ${dept.head.last_name}`
                        : 'Not Assigned'}

                    </p>

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-1">

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"

                    onClick={() => {

                      setSelectedDepartment({
                        ...dept,

                        head_of_department_id:
                          dept.head_of_department_id?.toString(),

                        is_active:
                          dept.is_active?.toString(),
                      });

                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"

                    onClick={() =>
                      handleDeleteDepartment(dept.id)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>

              </div>

            </CardHeader>

            {/* BODY */}
            <CardContent className="space-y-4">

              {/* STATS */}
              <div className="grid grid-cols-3 gap-3">

                {/* STAFF */}
                <div className="p-3 rounded-lg bg-muted/50 text-center">

                  <p className="text-2xl font-bold text-foreground">
                    {dept.faculty_count}
                  </p>

                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <Users className="w-3 h-3" />
                    Staff
                  </p>

                </div>

                {/* STUDENTS */}
                <div className="p-3 rounded-lg bg-muted/50 text-center">

                  <p className="text-2xl font-bold text-foreground">
                    {dept.student_count}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Students
                  </p>

                </div>

                {/* STATUS */}
                <div className="p-3 rounded-lg bg-muted/50 text-center">

                  <Badge
                    className={
                      dept.is_active
                        ? 'bg-green-500/10 text-green-700 border-green-500/20 border'
                        : 'bg-red-500/10 text-red-700 border-red-500/20 border'
                    }
                  >
                    {dept.is_active
                      ? 'Active'
                      : 'Inactive'}
                  </Badge>

                </div>

              </div>

              {/* BUDGET */}
              <div className="flex items-center justify-between pt-2 border-t border-border">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Budget
                  </p>

                  <p className="font-bold text-foreground">

                    $
                    {Number(
                      dept.budget_allocation || 0
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex items-center gap-1">

                  <TrendingUp className="w-4 h-4 text-green-600" />

                  <span className="font-semibold text-green-600">
                    Department
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="space-y-1 text-sm">

                <p className="text-muted-foreground">
                  Email:
                  {' '}
                  {dept.contact_email || 'N/A'}
                </p>

                <p className="text-muted-foreground">
                  Phone:
                  {' '}
                  {dept.contact_phone || 'N/A'}
                </p>

                <p className="text-muted-foreground">
                  Office:
                  {' '}
                  {dept.office_building || 'N/A'}
                  {' '}
                  -
                  {' '}
                  {dept.office_room_number || 'N/A'}
                </p>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}

        onClose={() => {
          setIsModalOpen(false);
          setSelectedDepartment(null);
        }}

        title={
          selectedDepartment
            ? 'Update Department'
            : 'Create Department'
        }

        fields={formFields}

        initialData={selectedDepartment}

        onSubmit={
          selectedDepartment
            ? handleUpdateDepartment
            : handleCreateDepartment
        }
      />

    </main>
  );
}