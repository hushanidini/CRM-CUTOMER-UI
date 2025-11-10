import { Edit2, Trash2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import type { Customer } from '../types/customer';

interface CustomerCardsProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  loading?: boolean;
}

export const CustomerCards = ({ customers, onEdit, onDelete, loading }: CustomerCardsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {customers.map(customer => (
        <div
          key={customer.customerId}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {customer.firstName} {customer.lastName}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(customer.dateCreated)}</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">
              {customer.firstName[0]}
              {customer.lastName[0]}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{customer.email}</span>
            </div>

            {customer.phoneNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{customer.phoneNumber}</span>
              </div>
            )}

            {(customer.city || customer.state || customer.country) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  {[customer.city, customer.state, customer.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Address */}
          {customer.address && (
            <div className="mb-4 rounded-md bg-gray-50 p-3">
              <p className="text-xs text-gray-500 mb-1">Address</p>
              <p className="text-sm text-gray-700">{customer.address}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <Button
              size="sm"
              variant="secondary"
              icon={<Edit2 className="h-4 w-4" />}
              onClick={() => onEdit(customer)}
              disabled={loading}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => onDelete(customer)}
              disabled={loading}
              className="text-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
