'use client';

import { useEffect, useState } from 'react';

import {
  Plus,
  Download,
  Edit2,
  Trash2,
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

export default function PayrollPage() {

  const [payrolls, setPayrolls] = useState([]);
  const [staff, setStaff] = useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedPayroll, setSelectedPayroll] =
    useState(null);

  const authHeaders = {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem('token')}`,
    },
  };

  // ================= FETCH PAYROLLS =================
  const fetchPayrolls = async () => {
    const res = await API.get(
      '/payroll-records',
      authHeaders
    );
    console.log(res.data)
    setPayrolls(res.data);
  };

  // ================= FETCH STAFF =================
  const fetchStaff = async () => {
    const res = await API.get(
      '/staff-profiles',
      authHeaders
    );
    setStaff(res.data);
  };

  useEffect(() => {
    fetchPayrolls();
    fetchStaff();
  }, []);

  // ================= CREATE =================
  const handleCreate = async (data) => {
    await API.post(
      '/payroll-records',
      data,
      authHeaders
    );

    fetchPayrolls();

    setIsModalOpen(false);
  };

  // ================= UPDATE =================
  const handleUpdate = async (data) => {
    await API.put(
      `/payroll-records/${selectedPayroll.id}`,
      data,
      authHeaders
    );

    fetchPayrolls();

    setSelectedPayroll(null);

    setIsModalOpen(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {

    if (!confirm('Delete payroll?'))
      return;

    await API.delete(
      `/payroll-records/${id}`,
      authHeaders
    );

    fetchPayrolls();
  };

  // ================= STATUS COLOR =================
  const getStatusColor = (status) => {

    switch (status) {

      case 'Paid':
        return 'bg-green-500/10 text-green-700 border-green-500/20';

      case 'Processed':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';

      case 'Failed':
        return 'bg-red-500/10 text-red-700 border-red-500/20';

      default:
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
    }
  };

  // ================= FORM =================
  const formFields = [

    {
      name: 'staff_id',
      label: 'Staff',
      type: 'select',
      required: true,

      options: staff.map(s => ({
        value: s.id,
        label: s.user.first_name,
      })),
    },

    {
      name: 'payroll_month',
      label: 'Month',
      type: 'number',
      required: true,
    },

    {
      name: 'payroll_year',
      label: 'Year',
      type: 'number',
      required: true,
    },

    {
      name: 'basic_salary',
      label: 'Basic Salary',
      type: 'number',
      required: true,
    },

    {
      name: 'allowances_total',
      label: 'Allowances',
      type: 'number',
    },

    {
      name: 'deductions_total',
      label: 'Deductions',
      type: 'number',
    },

    {
      name: 'income_tax',
      label: 'Income Tax',
      type: 'number',
    },

    {
      name: 'provident_fund',
      label: 'Provident Fund',
      type: 'number',
    },

    {
      name: 'professional_tax',
      label: 'Professional Tax',
      type: 'number',
    },

    {
      name: 'health_insurance_deduction',
      label: 'Health Insurance',
      type: 'number',
    },

    {
      name: 'other_deductions',
      label: 'Other Deductions',
      type: 'number',
    },

    {
      name: 'payment_status',
      label: 'Status',
      type: 'select',

      options: [
        'Pending',
        'Processed',
        'Paid',
        'Failed'
      ].map(v => ({
        value: v,
        label: v,
      })),
    },

    {
      name: 'payment_date',
      label: 'Payment Date',
      type: 'date',
    },

    {
      name: 'payment_method',
      label: 'Payment Method',
      type: 'text',
    },

    {
      name: 'transaction_reference',
      label: 'Transaction Ref',
      type: 'text',
    },

    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea',
    },
  ];

  // ================= TOTALS =================
  const totalPayroll =
    payrolls.reduce(
      (sum, p) => sum + Number(p.net_salary || 0),
      0
    );

  return (

    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Payroll Management
        </h1>

        <Button
          onClick={() => {
            setSelectedPayroll(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Process Payroll
        </Button>

      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-4 gap-4">

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Payroll
            </p>

            <p className="text-3xl font-bold">
              ${totalPayroll.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Employees
            </p>

            <p className="text-3xl font-bold">
              {payrolls.length}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* TABLE */}
      <Card>

        <CardHeader>
          <CardTitle>
            Payroll Records
          </CardTitle>

          <CardDescription>
            Staff salary management
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b bg-muted/50">

                <tr>

                  <th className="text-left p-4">
                    Staff
                  </th>

                  <th className="text-left p-4">
                    Month
                  </th>

                  <th className="text-left p-4">
                    Gross
                  </th>

                  <th className="text-left p-4">
                    Net
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {payrolls.map(record => (

                  <tr
                    key={record.id}
                    className="border-b hover:bg-muted/30"
                  >

                    <td className="p-4 font-medium">
{record.staff?.user
  ? `${record.staff.user.first_name} ${record.staff.user.last_name}`
  : 'Unknown'}                    </td>

                    <td className="p-4">
                      {record.payroll_month}/
                      {record.payroll_year}
                    </td>

                    <td className="p-4">
                      ${record.gross_salary}
                    </td>

                    <td className="p-4 font-bold text-green-600">
                      ${record.net_salary}
                    </td>

                    <td className="p-4">

                      <Badge
                        className={`${getStatusColor(record.payment_status)} border`}
                      >
                        {record.payment_status}
                      </Badge>

                    </td>

                    <td className="p-4 flex gap-2">

                      <Button
                        size="sm"
                        variant="outline"

                        onClick={() => {
                          setSelectedPayroll({
                            ...record,

                            staff_id:
                              record.staff_id?.toString(),
                          });

                          setIsModalOpen(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"

                        onClick={() =>
                          handleDelete(record.id)
                        }
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>

      {/* MODAL */}
      <FormModal
        isOpen={isModalOpen}

        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayroll(null);
        }}

        title={
          selectedPayroll
            ? 'Update Payroll'
            : 'Create Payroll'
        }

        fields={formFields}

        initialData={selectedPayroll}

        onSubmit={
          selectedPayroll
            ? handleUpdate
            : handleCreate
        }
      />

    </main>
  );
}