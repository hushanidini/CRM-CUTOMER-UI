import { useState } from 'react';
import { z } from 'zod';
import type { CustomerFormData } from '../schemas/customerSchema';

type ValidationErrors = Partial<Record<keyof CustomerFormData, string>>;

export const useFormValidation = (schema: z.ZodType<CustomerFormData>) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (data: CustomerFormData): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof CustomerFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const clearErrors = () => setErrors({});

  const clearError = (field: keyof CustomerFormData) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errors, validate, clearErrors, clearError };
};
