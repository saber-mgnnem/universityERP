'use client';

import { useEffect, useState } from 'react';

import {
  Plus,
  Check,
  X,
  Clock,
  Trash2,
} from 'lucide-react';

import API from '@/services/api';

import FormModal from '@/components/dashboard/dep-form-modal';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

export default function LeaveManagementPage() {

  const [requests, setRequests] = useState([]);

  const [staffProfiles, setStaffProfiles] = useState([]);

  const [filterStatus, setFilterStatus] =
    useState('All');

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ================= FETCH REQUESTS =================
  const fetchRequests = async () => {
    try {

      const res = await API.get(
        '/leave-requests'
      );

      setRequests(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH STAFF =================
  const fetchStaff = async () => {
    try {

      const res = await API.get(
        '/staff-profiles'
      );

      setStaffProfiles(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchStaff();
  }, []);

  // ================= CREATE =================
  const handleCreate = async (
    formData
  ) => {

    try {

      await API.post(
        '/leave-requests',
        {
          staff_id: formData.staff_id,
          leave_type:
            formData.leave_type,
          start_date:
            formData.start_date,
          end_date:
            formData.end_date,
          number_of_days:
            formData.number_of_days,
          leave_reason:
            formData.leave_reason,
        }
      );

      fetchRequests();

      setIsModalOpen(false);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= STATUS UPDATE =================
  const handleStatusUpdate = async (
    id,
    status,
    rejectionReason = ''
  ) => {

    try {

      await API.put(
        `/leave-requests/${id}`,
        {
          approval_status: status,
          rejection_reason:
            rejectionReason,
        }
      );

      fetchRequests();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {

    if (
      !confirm(
        'Delete leave request?'
      )
    ) return;

    try {

      await API.delete(
        `/leave-requests/${id}`
      );

      fetchRequests();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FILTER =================
  const filteredRequests =
    requests.filter((req) => {

      if (filterStatus === 'All')
        return true;

      return (
        req.approval_status ===
        filterStatus
      );
    });

  // ================= STATUS ICON =================
  const getStatusIcon = (status) => {

    switch (status) {

      case 'Approved':
        return (
          <Check className="w-4 h-4 text-green-600" />
        );

      case 'Rejected':
        return (
          <X className="w-4 h-4 text-red-600" />
        );

      case 'Pending':
        return (
          <Clock className="w-4 h-4 text-yellow-600" />
        );

      default:
        return null;
    }
  };

  // ================= FORM FIELDS =================
  const formFields = [

    {
      name: 'staff_id',
      label: 'Staff Member',
      type: 'select',
      required: true,

      options:
        staffProfiles.map((s) => ({
          value: s.id,

          label:
            s.user?.first_name +
            ' ' +
            s.user?.last_name,
        })),
    },

    {
      name: 'leave_type',
      label: 'Leave Type',
      type: 'select',

      options: [
        {
          value: 'Annual',
          label: 'Annual',
        },

        {
          value: 'Sick',
          label: 'Sick',
        },

        {
          value: 'Casual',
          label: 'Casual',
        },

        {
          value: 'Maternity',
          label: 'Maternity',
        },

        {
          value: 'Paternity',
          label: 'Paternity',
        },

        {
          value: 'Bereavement',
          label: 'Bereavement',
        },

        {
          value: 'Unpaid',
          label: 'Unpaid',
        },
      ],
    },

    {
      name: 'start_date',
      label: 'Start Date',
      type: 'date',
    },

    {
      name: 'end_date',
      label: 'End Date',
      type: 'date',
    },

    {
      name: 'number_of_days',
      label: 'Number of Days',
      type: 'number',
    },

    {
      name: 'leave_reason',
      label: 'Reason',
      type: 'textarea',
    },
  ];

  return (

    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Leave Management
        </h1>

        <Button
          className="flex items-center gap-2"
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          <Plus className="h-5 w-5" />

          New Leave Request
        </Button>

      </div>

      {/* FILTERS */}
      <div className="flex gap-2">

        {[
          'All',
          'Pending',
          'Approved',
          'Rejected',
        ].map((status) => (

          <Button
            key={status}

            variant={
              filterStatus ===
              status
                ? 'default'
                : 'outline'
            }

            onClick={() =>
              setFilterStatus(status)
            }
          >
            {status}
          </Button>

        ))}

      </div>

      {/* REQUESTS */}
      <div className="space-y-4">

        {filteredRequests.map(
          (request) => (

            <Card
              key={request.id}
              className="border-border"
            >

              <CardContent className="pt-6">

                <div className="flex items-start justify-between gap-4">

                  {/* LEFT SIDE */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">

                      <h3 className="text-lg font-semibold">

                        {
                          request.staff?.user
                            ?.first_name
                        }{' '}

                        {
                          request.staff?.user
                            ?.last_name
                        }

                      </h3>

                      <Badge variant="outline">
                        {request.leave_type}
                      </Badge>

                      <Badge className="flex items-center gap-1">

                        {getStatusIcon(
                          request.approval_status
                        )}

                        {
                          request.approval_status
                        }

                      </Badge>

                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">

                      <div>

                        <p className="text-muted-foreground">
                          Period
                        </p>

                        <p className="font-medium">

                          {
                            request.start_date
                          }

                          {' '}to{' '}

                          {
                            request.end_date
                          }

                        </p>

                      </div>

                      <div>

                        <p className="text-muted-foreground">
                          Duration
                        </p>

                        <p className="font-medium">

                          {
                            request.number_of_days
                          }{' '}
                          days

                        </p>

                      </div>

                      <div className="col-span-2">

                        <p className="text-muted-foreground">
                          Reason
                        </p>

                        <p className="font-medium">

                          {
                            request.leave_reason
                          }

                        </p>

                      </div>

                      {request.rejection_reason && (

                        <div className="col-span-2">

                          <p className="text-red-500 font-medium">
                            Rejection Reason
                          </p>

                          <p className="text-sm text-red-400">

                            {
                              request.rejection_reason
                            }

                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">

                    {request.approval_status ===
                      'Pending' && (

                      <>

                        {/* APPROVE */}
                        <Button
                          size="sm"

                          className="bg-green-600 hover:bg-green-700"

                          onClick={() =>
                            handleStatusUpdate(
                              request.id,
                              'Approved'
                            )
                          }
                        >

                          <Check className="h-4 w-4 mr-1" />

                          Approve

                        </Button>

                        {/* REJECT */}
                        <Button
                          size="sm"

                          variant="destructive"

                          onClick={() => {

                            const reason =
                              prompt(
                                'Enter rejection reason'
                              );

                            handleStatusUpdate(
                              request.id,
                              'Rejected',
                              reason || ''
                            );
                          }}
                        >

                          <X className="h-4 w-4 mr-1" />

                          Reject

                        </Button>

                      </>

                    )}

                    {/* DELETE */}
                    <Button
                      size="sm"

                      variant="destructive"

                      onClick={() =>
                        handleDelete(
                          request.id
                        )
                      }
                    >

                      <Trash2 className="h-4 w-4" />

                    </Button>

                  </div>

                </div>

              </CardContent>

            </Card>

          )
        )}

      </div>

      {/* CREATE MODAL */}
      <FormModal
        isOpen={isModalOpen}

        onClose={() =>
          setIsModalOpen(false)
        }

        title="Create Leave Request"

        fields={formFields}

        onSubmit={handleCreate}
      />

    </main>
  );
}