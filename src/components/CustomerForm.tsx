import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { customerSchema, type CustomerFormData } from '../schemas/customerSchema';
import { useFormValidation } from '../hooks/useFormValidation';
import type { Customer } from '../types/customer';

interface CustomerFormProps {
    customer?: Customer;
    onSubmit: (data: CustomerFormData) => Promise<boolean>;
    onCancel: () => void;
    loading?: boolean;
}

export const CustomerForm = ({ customer, onSubmit, onCancel, loading }: CustomerFormProps) => {
    const { errors, validate, clearError } = useFormValidation(customerSchema);

    const [formData, setFormData] = useState<CustomerFormData>({
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        email: customer?.email || '',
        phoneNumber: customer?.phoneNumber || '',
        address: customer?.address || '',
        city: customer?.city || '',
        state: customer?.state || '',
        country: customer?.country || '',
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phoneNumber: customer.phoneNumber || '',
                address: customer.address || '',
                city: customer.city || '',
                state: customer.state || '',
                country: customer.country || '',
            });
        }
    }, [customer]);
    console.log('customer--', customer)
    const handleChange = (field: keyof CustomerFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        clearError(field);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate(formData)) {
            return;
        }

        const success = await onSubmit(formData);
        if (success) {
            // Reset form if creating new customer
            if (!customer) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    error={errors.firstName}
                    placeholder="John"
                    required
                    disabled={loading}
                />

                <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    error={errors.lastName}
                    placeholder="Doe"
                    required
                    disabled={loading}
                />
            </div>

            <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                error={errors.email}
                placeholder="john.doe@example.com"
                required
                disabled={loading}
            />

            <Input
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                error={errors.phoneNumber}
                onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

                    // Format as XXX-XXX-XXXX
                    if (value.length > 3 && value.length <= 6) {
                        value = `${value.slice(0, 3)}-${value.slice(
                            3
                        )}`;
                    } else if (value.length > 6) {
                        value = `${value.slice(0, 3)}-${value.slice(
                            3,
                            6
                        )}-${value.slice(6, 10)}`;
                    }

                    handleChange('phoneNumber', value); // Update field value
                }}
                placeholder="XXX-XXX-XXXX"
                maxLength={12}
                helperText="Format: 121-555-0101"
                disabled={loading}
            />

            <Input
                label="Address"
                value={formData.address}
                onChange={e => handleChange('address', e.target.value)}
                error={errors.address}
                placeholder="123 Main St"
                disabled={loading}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                    label="City"
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    error={errors.city}
                    placeholder="New York"
                    disabled={loading}
                />

                <Input
                    label="State"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                    error={errors.state}
                    placeholder="NY"
                    disabled={loading}
                />

                <Input
                    label="Country"
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                    error={errors.country}
                    placeholder="USA"
                    disabled={loading}
                />
            </div>

            <div className="flex gap-3 pt-4 justify-end border-t border-gray-200">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" variant='secondary'>
                    {customer ? 'Update Customer' : 'Create Customer'}
                </Button>
            </div>
        </form>
    );
};
