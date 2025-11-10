import { lazy, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Plus, LayoutGrid, Table as TableIcon, Users } from 'lucide-react';
import { useCustomers } from './hooks/useCustomers';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { EmptyState } from './components/ui/EmptyState';
import { CustomerForm } from './components/CustomerForm';
import type { Customer, ViewMode } from './types/customer';
import type { CustomerFormData } from './schemas/customerSchema';

// Lazy load view components for code splitting
const CustomerTable = lazy(() =>
  import('./components/CustomerTable').then(module => ({
    default: module.CustomerTable,
  }))
);

const CustomerCards = lazy(() =>
  import('./components/CustomerCards').then(module => ({
    default: module.CustomerCards,
  }))
);

function App() {
  const {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    fetchCustomers,
  } = useCustomers();

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleCreate = async (data: CustomerFormData) => {
    const success = await createCustomer(data);
    if (success) {
      setIsCreateModalOpen(false);
    }
    return success;
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (data: CustomerFormData) => {
    if (!selectedCustomer) return false;
    const success = await updateCustomer(selectedCustomer.customerId, data);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedCustomer(null);
    }
    return success;
  };

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCustomer) return;
    const success = await deleteCustomer(selectedCustomer.customerId);
    if (success) {
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your customer accounts efficiently
              </p>
            </div>
            <Button
              icon={<Plus className="h-5 w-5" />}
              onClick={() => setIsCreateModalOpen(true)}
              size="lg"
              variant='secondary'
            >
              Add New Customer
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {customers.length} {customers.length === 1 ? 'Customer' : 'Customers'}
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'card'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>

        {/* Customer List */}
        {loading && customers.length === 0 ? (
          <LoadingSpinner text="Loading customers..." />
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="secondary" onClick={() => fetchCustomers()} className="mt-4" size="sm">
              Try Again
            </Button>
          </div>
        ) : customers.length === 0 ? (
          <EmptyState
            icon={<Users className="h-12 w-12 text-gray-400" />}
            title="No customers yet"
            description="Get started by creating your first customer account"
            action={
              <Button
                icon={<Plus className="h-5 w-5" />}
                onClick={() => setIsCreateModalOpen(true)}
                variant='secondary'
              >
                Add New Customer
              </Button>
            }
          />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            {viewMode === 'table' ? (
              <CustomerTable
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                loading={loading}
              />
            ) : (
              <CustomerCards
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                loading={loading}
              />
            )}
          </Suspense>
        )}
      </main>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Customer"
        size="lg"
      >
        <CustomerForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={loading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCustomer(null);
        }}
        title="Edit Customer"
        size="lg"
      >
        <CustomerForm
          customer={selectedCustomer || undefined}
          onSubmit={handleUpdate}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedCustomer(null);
          }}
          loading={loading}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
      />
    </div>
  );
}

export default App;
