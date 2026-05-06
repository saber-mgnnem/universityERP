'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';
import { CreditCard, AlertTriangle } from 'lucide-react';
import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const TUITION = 200;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    fetchPayments();

    if (params.get('success')) {
      console.log('Payment successful');
    }
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get('/student/payments');

      setPayments(res.data.payments || []);
      setStats(res.data.stats || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    if (!selectedPlan) return;

    const res = await API.post('/student/payments/stripe-session', {
      plan: selectedPlan,
    });

    window.location.href = res.data.url;
  };

  const columns = [
    { key: 'semester', label: 'Semester' },
    { key: 'amount', label: 'Amount' },
    { key: 'dueDate', label: 'Due Date' },

    {
      key: 'status',
      label: 'Status',
      render: (item) => <StatusBadge status={item.status} />
    },

    { key: 'paidDate', label: 'Paid Date' },
  ];

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">Tuition Payments</h1>
      <p>£{TUITION} per semester system</p>

      {stats.remaining_semesters > 0 && (
        <div className="p-4 border bg-yellow-50 flex gap-2">
          <AlertTriangle />
          You still have {stats.remaining_semesters} unpaid semester(s)
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <p>Balance</p>
          <p className="text-2xl font-bold">${stats.balance}</p>
        </div>

        <div className="p-4 border rounded">
          <p>Total Paid</p>
          <p className="text-2xl font-bold">${stats.total_paid}</p>
        </div>

        <div className="p-4 border rounded">
          <p>Next Payment</p>
          <p>{stats.next_payment ?? 'OK'}</p>
        </div>
      </div>

      <div className="border p-6 space-y-4">

        <h2 className="font-semibold flex gap-2">
          <CreditCard /> Choose Plan
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <button
            onClick={() => setSelectedPlan('1-semester')}
            className={`p-4 border ${selectedPlan === '1-semester' ? 'bg-blue-100' : ''}`}
          >
            1 Semester — £{TUITION}
          </button>

          <button
            onClick={() => setSelectedPlan('2-semester')}
            className={`p-4 border ${selectedPlan === '2-semester' ? 'bg-blue-100' : ''}`}
          >
            Full Year — £{TUITION * 2}
          </button>

        </div>

        <button
          onClick={handlePay}
          disabled={!selectedPlan}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Pay with Stripe
        </button>
      </div>

      <DataTable columns={columns} data={payments} />

    </main>
  );
}