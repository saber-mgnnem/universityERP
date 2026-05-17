'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import { Plus, Clock, Check, X } from 'lucide-react';

import FormModal from '@/components/dashboard/dep-form-modal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProfessorLeavePage() {

  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [staffLoading, setStaffLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= FETCH MY LEAVES =================
  const fetchMyRequests = async () => {
    try {
      const res = await API.get('/my-leave-requests');
      setRequests(res.data || []);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET LOGGED USER =================
  const fetchMe = async () => {
    try {
      const res = await API.get('/me');

      // IMPORTANT: adjust if backend returns {user: ...}
      setStaff(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setStaffLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
    fetchMe();
  }, []);

  // ================= CREATE =================
  const handleCreate = async (form) => {
    try {

      // SAFETY CHECK (prevents crash)
      if (!staff?.id) {
        alert("User not loaded yet. Please wait.");
        return;
      }

      await API.post('/my-leave-requests', {
        staff_id: staff.id,
        leave_type: form.leave_type,
        start_date: form.start_date,
        end_date: form.end_date,
        number_of_days: form.number_of_days,
        leave_reason: form.leave_reason,
      });

      setIsModalOpen(false);
      fetchMyRequests();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= STATUS ICON =================
  const getStatusIcon = (status) => {
    if (status === 'Approved') return <Check className="w-4 h-4 text-green-600" />;
    if (status === 'Rejected') return <X className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  // ================= FORM =================
  const formFields = [
    {
      name: 'leave_type',
      label: 'Leave Type',
      type: 'select',
      options: [
        { value: 'Annual', label: 'Annual' },
        { value: 'Sick', label: 'Sick' },
        { value: 'Casual', label: 'Casual' },
        { value: 'Unpaid', label: 'Unpaid' },
      ],
    },
    { name: 'start_date', label: 'Start Date', type: 'date' },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'number_of_days', label: 'Days', type: 'number' },
    { name: 'leave_reason', label: 'Reason', type: 'textarea' },
  ];

  if (loading || staffLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">My Leave Requests</h1>

        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={!staff?.id}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Leave
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id}>
            <CardContent className="pt-6">

              <div className="flex justify-between">

                <div>

                  <div className="flex gap-2 items-center">
                    <Badge>{req.leave_type}</Badge>

                    <Badge className="flex items-center gap-1">
                      {getStatusIcon(req.approval_status)}
                      {req.approval_status}
                    </Badge>
                  </div>

                  <p className="text-sm mt-2 text-muted-foreground">
                    {req.start_date} → {req.end_date}
                  </p>

                  <p className="text-sm">
                    {req.number_of_days} days
                  </p>

                  <p className="mt-2">{req.leave_reason}</p>

                  {req.rejection_reason && (
                    <p className="text-red-500 text-sm mt-2">
                      {req.rejection_reason}
                    </p>
                  )}

                </div>

              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Leave"
        fields={formFields}
        onSubmit={handleCreate}
      />

    </main>
  );
}