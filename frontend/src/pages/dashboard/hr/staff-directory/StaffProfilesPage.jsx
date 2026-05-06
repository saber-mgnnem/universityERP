'use client';

import { useEffect, useMemo, useState } from 'react';

import API from '@/services/api';

import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Users,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import FormModal from '@/components/dashboard/dep-form-modal';

export default function StaffProfilesPage() {

  // ================= STATE =================
  const [staffData, setStaffData] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= FETCH STAFF =================
  const fetchStaff = async () => {
    try {

      const res = await API.get('/staff-profiles');

      setStaffData(res.data || []);

    } catch (error) {
      console.error('Failed to fetch staff', error);
    }
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {

      const res = await API.get('/departments');

      setDepartments(res.data || []);

    } catch (error) {
      console.error(error);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchStaff();
    fetchDepartments();
  }, []);

  // ================= FILTER =================
  const filteredStaff = useMemo(() => {

    return staffData.filter((staff) => {

      const fullName =
        `${staff.user?.first_name || ''} ${staff.user?.last_name || ''}`;

      const matchesSearch =
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (staff.user?.email || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDept === 'All' ||
        staff.department?.department_name === selectedDept;

      return matchesSearch && matchesDept;
    });

  }, [staffData, searchTerm, selectedDept]);

  // ================= DEPARTMENTS FILTER =================
  const departmentFilters = [
    'All',
    ...new Set(
      staffData.map(
        (s) => s.department?.department_name
      ).filter(Boolean)
    ),
  ];

  // ================= ADD STAFF =================
  const handleAddStaff = async (formData) => {

    try {

      await API.post('/staff-profiles', {
        user_id: formData.user_id,
        employee_id: formData.employee_id,
        department_id: formData.department_id,
        designation_title: formData.designation_title,
        employment_type: formData.employment_type,
        joining_date: formData.joining_date,
      });

      setIsModalOpen(false);

      fetchStaff();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        'Failed to create staff profile'
      );
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {

    const confirmDelete = confirm(
      'Are you sure you want to remove this staff member?'
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/staff-profiles/${id}`);

      fetchStaff();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.error ||
        'Failed to delete'
      );
    }
  };

  // ================= FORM =================
  const formFields = [
    {
      name: 'user_id',
      label: 'User ID',
      type: 'number',
      required: true,
    },

    {
      name: 'employee_id',
      label: 'Employee ID',
      required: true,
    },

    {
      name: 'department_id',
      label: 'Department',
      type: 'select',
      required: true,

      options: departments.map((d) => ({
        label: d.department_name,
        value: d.id,
      })),
    },

    {
      name: 'designation_title',
      label: 'Designation',
      required: true,
    },

    {
      name: 'employment_type',
      label: 'Employment Type',
      type: 'select',
      required: true,

      options: [
        'Full-time',
        'Part-time',
        'Contract',
      ],
    },

    {
      name: 'joining_date',
      label: 'Joining Date',
      type: 'date',
      required: true,
    },
  ];

  return (
    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Staff Profiles
        </h1>

        <Button
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Add Staff Member
        </Button>
      </div>

      {/* FILTERS */}
      <Card className="border-border">

        <CardContent className="pt-6">

          <div className="flex gap-4 flex-col md:flex-row">

            {/* SEARCH */}
            <div className="flex-1 relative">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background"
              />
            </div>

            {/* DEPARTMENT FILTER */}
            <select
              value={selectedDept}
              onChange={(e) =>
                setSelectedDept(e.target.value)
              }
              className="px-4 py-2 border border-input rounded-lg bg-background cursor-pointer"
            >

              {departmentFilters.map((dept) => (
                <option
                  key={dept}
                  value={dept}
                >
                  {dept}
                </option>
              ))}

            </select>

          </div>

        </CardContent>
      </Card>

      {/* STAFF GRID */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">

        {filteredStaff.map((staff) => (

          <Card
            key={staff.id}
            className="border-border hover:shadow-lg transition-shadow"
          >

            {/* CARD HEADER */}
            <CardHeader className="flex flex-row items-start justify-between pb-3">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>

                <div>

                  <CardTitle className="text-lg">

                    {staff.user?.first_name}{' '}
                    {staff.user?.last_name}

                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {staff.designation_title || '-'}
                  </p>

                </div>

              </div>

              <Badge
                variant={
                  staff.is_active
                    ? 'default'
                    : 'secondary'
                }
              >
                {staff.is_active
                  ? 'Active'
                  : 'Inactive'}
              </Badge>

            </CardHeader>

            {/* CARD BODY */}
            <CardContent className="space-y-3">

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-muted-foreground">
                    Department
                  </p>

                  <p className="font-medium text-foreground">
                    {staff.department?.department_name || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Employee ID
                  </p>

                  <p className="font-medium text-foreground">
                    {staff.employee_id}
                  </p>
                </div>

                <div className="col-span-2">

                  <p className="text-muted-foreground">
                    Email
                  </p>

                  <p className="font-medium text-foreground text-xs break-all">
                    {staff.user?.email}
                  </p>

                </div>

                <div className="col-span-2">

                  <p className="text-muted-foreground">
                    Qualification
                  </p>

                  <p className="font-medium text-foreground">
                    {staff.qualification || '-'}
                  </p>

                </div>

                <div>

                  <p className="text-muted-foreground">
                    Employment Type
                  </p>

                  <p className="font-medium text-foreground">
                    {staff.employment_type || '-'}
                  </p>

                </div>

                <div>

                  <p className="text-muted-foreground">
                    Joining Date
                  </p>

                  <p className="font-medium text-foreground">
                    {staff.joining_date || '-'}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 pt-2 border-t border-border">

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-destructive"
                  onClick={() => handleDelete(staff.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>

              </div>

            </CardContent>

          </Card>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredStaff.length === 0 && (

        <Card className="border-border">

          <CardContent className="py-12 text-center">

            <p className="text-muted-foreground">
              No staff members found matching your criteria.
            </p>

          </CardContent>

        </Card>
      )}

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Staff Member"
        fields={formFields}
        onSubmit={handleAddStaff}
      />

    </main>
  );
}