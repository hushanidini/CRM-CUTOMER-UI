import { useState, useEffect, useCallback } from 'react';
import { customerApi } from '../services/api';
import type { Customer, CreateCustomerDTO, UpdateCustomerDTO, ApiError } from '../types/customer';
import toast from 'react-hot-toast';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    limit: 50,
    offset: 0,
    count: 0,
  });

  const fetchCustomers = useCallback(async (limit = 50, offset = 0) => {
    setLoading(true);
    setError(null);

    try {
      const response = await customerApi.getAll(limit, offset);
      setCustomers(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      toast.error(apiError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCustomer = async (data: CreateCustomerDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await customerApi.create(data);
      setCustomers(prev => [response.data, ...prev]);
      toast.success('Customer created successfully!');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);

      if (apiError.errors && apiError.errors.length > 0) {
        apiError.errors.forEach(error => {
          toast.error(`${error.field}: ${error.message}`);
        });
      } else {
        toast.error(apiError.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: string, data: UpdateCustomerDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await customerApi.update(id, data);
      setCustomers(prev =>
        prev.map(customer => (customer.customerId === id ? response.data : customer))
      );
      toast.success('Customer updated successfully!');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);

      if (apiError.errors && apiError.errors.length > 0) {
        apiError.errors.forEach(error => {
          toast.error(`${error.field}: ${error.message}`);
        });
      } else {
        toast.error(apiError.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await customerApi.delete(id);
      setCustomers(prev => prev.filter(customer => customer.customerId !== id));
      toast.success('Customer deleted successfully!');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      toast.error(apiError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    pagination,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
