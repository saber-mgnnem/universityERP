'use client';

import { useState } from 'react';

import DataTable from '@/components/dashboard/data-table';
import StatusBadge from '@/components/dashboard/status-badge';
import FormModal from '@/components/dashboard/form-modal';
import { Plus } from 'lucide-react';

const mockPendingPayments = [
  { id: 1, vendor: 'Tech Solutions Inc', amount: '$25,000', dueDate: '2024-02-20', invoiceNo: 'INV-001', status: 'pending' },
  { id: 2, vendor: 'Campus Supplies Ltd', amount: '$8,500', dueDate: '2024-02-15', invoiceNo: 'INV-002', status: 'pending' },
  { id: 3, vendor: 'Utilities Company', amount: '$5,600', dueDate: '2024-02-10', invoiceNo: 'INV-003', status: 'overdue' },
];

const mockProcessedPayments = [
  { id: 1, vendor: 'Equipment Rental Co', amount: '$12,000', processDate: '2024-02-10', method: 'Bank Transfer', status: 'completed' },
  { id: 2, vendor: 'Maintenance Services', amount: '$3,200', processDate: '2024-02-08', method: 'Credit Card', status: 'completed' },
];

export default function PaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProcessPayment = (formData) => {
    console.log('Payment processed:', formData);
    setIsModalOpen(false);
  };

  const pendingColumns = [
    { key: 'vendor', label: 'Vendor' },
    { key: 'amount', label: 'Amount' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'invoiceNo', label: 'Invoice #' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const processedColumns = [
    { key: 'vendor', label: 'Vendor' },
    { key: 'amount', label: 'Amount' },
    { key: 'processDate', label: 'Process Date' },
    { key: 'method', label: 'Payment Method' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const formFields = [
    { name: 'vendor', label: 'Vendor', required: true },
    { name: 'amount', label: 'Amount', placeholder: '$', required: true },
    { name: 'method', label: 'Payment Method', type: 'select', options: ['Bank Transfer', 'Credit Card', 'Check'], required: true },
    { name: 'invoiceNo', label: 'Invoice Number', required: true },
  ];

  return (
    
        <main className="p-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Payment Processing</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Process Payment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-3xl font-bold">${mockPendingPayments.reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0) / 1000}K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-3xl font-bold text-red-600">${mockPendingPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0) / 1000}K</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">This Month Processed</p>
                <p className="text-3xl font-bold">${mockProcessedPayments.reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0) / 1000}K</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
              <DataTable
                columns={pendingColumns}
                data={mockPendingPayments}
                searchable={true}
                pagination={false}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Recently Processed</h2>
              <DataTable
                columns={processedColumns}
                data={mockProcessedPayments}
                searchable={true}
                pagination={false}
              />
            </div>
          </div>
          <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Process Payment"
        fields={formFields}
        onSubmit={handleProcessPayment}
      />
        </main>

      
  );
}
