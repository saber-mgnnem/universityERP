'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Download,
  AlertCircle,
} from 'lucide-react';

import API from '@/services/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import FormModal from '@/components/dashboard/dep-form-modal';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [staffProfiles, setStaffProfiles] = useState([]);

  const [filterStatus, setFilterStatus] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ edit mode
  const [editingContract, setEditingContract] = useState(null);

  // ================= FETCH CONTRACTS =================
  const fetchContracts = async () => {
    try {
      const res = await API.get('/employment-contracts');
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH STAFF =================
  const fetchStaff = async () => {
    try {
      const res = await API.get('/staff-profiles');
      setStaffProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchStaff();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleSubmitContract = async (formData) => {
    try {
      // ✅ UPDATE
      if (editingContract) {
        await API.put(
          `/employment-contracts/${editingContract.id}`,
          {
            staff_id: formData.staff_id,
            contract_start_date: formData.contract_start_date,
            contract_end_date: formData.contract_end_date,
            contract_type: formData.contract_type,
            salary_amount: formData.salary_amount,
            salary_frequency: formData.salary_frequency,
            benefits_description: formData.benefits_description,
            renewal_date: formData.renewal_date,
            contract_status: formData.contract_status,
          }
        );
      }

      // ✅ CREATE
      else {
        await API.post('/employment-contracts', {
          staff_id: formData.staff_id,
          contract_start_date: formData.contract_start_date,
          contract_end_date: formData.contract_end_date,
          contract_type: formData.contract_type,
          salary_amount: formData.salary_amount,
          salary_frequency: formData.salary_frequency,
          benefits_description: formData.benefits_description,
          renewal_date: formData.renewal_date,
          contract_status: formData.contract_status,
        });
      }

      fetchContracts();

      setIsModalOpen(false);
      setEditingContract(null);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm('Delete this contract?')) return;

    try {
      await API.delete(`/employment-contracts/${id}`);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= OPEN EDIT =================
  const handleEdit = (contract) => {
    setEditingContract({
      id: contract.id,
      staff_id: contract.staff_id,
      contract_start_date: contract.contract_start_date,
      contract_end_date: contract.contract_end_date,
      contract_type: contract.contract_type,
      salary_amount: contract.salary_amount,
      salary_frequency: contract.salary_frequency,
      benefits_description: contract.benefits_description,
      renewal_date: contract.renewal_date,
      contract_status: contract.contract_status,
    });

    setIsModalOpen(true);
  };

  // ================= FILTER =================
  const filteredContracts = contracts.filter((contract) => {
    if (filterStatus === 'All') return true;
    return contract.contract_status === filterStatus;
  });

  // ================= STATUS COLOR =================
  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired':
        return 'bg-red-500/10 text-red-700 border-red-500/20';

      case 'Renewed':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';

      case 'Active':
        return 'bg-green-500/10 text-green-700 border-green-500/20';

      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  // ================= FORM FIELDS =================
  const formFields = [
    {
      name: 'staff_id',
      label: 'Staff Member',
      type: 'select',
      required: true,
      options: staffProfiles.map((s) => ({
        value: s.id,
        label:
          s.user?.first_name + ' ' + s.user?.last_name,
      })),
    },

    {
      name: 'contract_start_date',
      label: 'Start Date',
      type: 'date',
      required: true,
    },

    {
      name: 'contract_end_date',
      label: 'End Date',
      type: 'date',
    },

    {
      name: 'contract_type',
      label: 'Contract Type',
      type: 'select',
      options: [
        { value: 'Permanent', label: 'Permanent' },
        { value: 'Temporary', label: 'Temporary' },
        { value: 'Fixed-Term', label: 'Fixed-Term' },
        { value: 'Casual', label: 'Casual' },
      ],
    },

    {
      name: 'salary_amount',
      label: 'Salary',
      type: 'number',
    },

    {
      name: 'salary_frequency',
      label: 'Salary Frequency',
      type: 'select',
      options: [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Annually', label: 'Annually' },
      ],
    },

    {
      name: 'contract_status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Expired', label: 'Expired' },
        { value: 'Renewed', label: 'Renewed' },
        { value: 'Terminated', label: 'Terminated' },
      ],
    },

    {
      name: 'benefits_description',
      label: 'Benefits',
      type: 'textarea',
    },

    {
      name: 'renewal_date',
      label: 'Renewal Date',
      type: 'date',
    },
  ];

  return (
    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Employment Contracts
        </h1>

        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setEditingContract(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5" />
          Create Contract
        </Button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {['All', 'Active', 'Expired', 'Renewed'].map(
          (status) => (
            <Button
              key={status}
              variant={
                filterStatus === status
                  ? 'default'
                  : 'outline'
              }
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </Button>
          )
        )}
      </div>

      {/* TABLE */}
      <Card className="border-border overflow-hidden">
        <CardHeader>
          <CardTitle>Contracts</CardTitle>

          <CardDescription>
            Manage employee contracts
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-6">
                    Employee
                  </th>

                  <th className="text-left py-3 px-6">
                    Type
                  </th>

                  <th className="text-left py-3 px-6">
                    Salary
                  </th>

                  <th className="text-left py-3 px-6">
                    End Date
                  </th>

                  <th className="text-left py-3 px-6">
                    Status
                  </th>

                  <th className="text-left py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">
                          {contract.staff?.user?.first_name}{' '}
                          {contract.staff?.user?.last_name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {
                            contract.staff?.designation_title
                          }
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {contract.contract_type}
                    </td>

                    <td className="py-4 px-6">
                      ${contract.salary_amount}
                    </td>

                    <td className="py-4 px-6">
                      {contract.contract_end_date}
                    </td>

                    <td className="py-4 px-6">
                      <Badge
                        className={`${getStatusColor(
                          contract.contract_status
                        )} border`}
                      >
                        {contract.contract_status}
                      </Badge>
                    </td>

                    {/* ✅ ACTIONS */}
                    <td className="py-4 px-6">
                      <div className="flex gap-2">

                        {/* EDIT */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() =>
                            handleEdit(contract)
                          }
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        {/* DELETE */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() =>
                            handleDelete(contract.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>
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
          setEditingContract(null);
        }}
        title={
          editingContract
            ? 'Update Contract'
            : 'Create Contract'
        }
        fields={formFields}
        initialData={editingContract}
        onSubmit={handleSubmitContract}
      />
    </main>
  );
}