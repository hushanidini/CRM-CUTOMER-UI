import { z } from 'zod';
const phoneRegex = /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/;
export const customerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  email: z.string().email('Invalid email format').max(100, 'Email must not exceed 100 characters'),

  //   phoneNumber: z
  //     .string()
  //     .regex(/^[\d\s\-+()]+$/, 'Invalid phone number format')
  //     .min(10, 'Phone number must contain at least 10 digits')
  //     .optional()
  //     .or(z.literal('')),
  phoneNumber: z
    .string()
    .optional()
    .refine(val => !val || phoneRegex.test(val), {
      message: 'Phone number must be in format XXX-XXX-XXXX',
    }),
  // .string()
  // .regex(/^\+\d-\d{3}-\d{4}$/, 'Phone number must be in format: +1-555-0103')
  // .refine(val => {
  //   if (val === '') return true;
  //   // Extract just the digits and count them
  //   const digits = val.replace(/\D/g, '');
  //   return digits.length === 10;
  // }, 'Phone number must contain exactly 10 digits')
  // .optional()
  // .or(z.literal('')),

  address: z
    .string()
    .max(200, 'Address must not exceed 200 characters')
    .optional()
    .or(z.literal('')),

  city: z.string().max(50, 'City must not exceed 50 characters').optional().or(z.literal('')),

  state: z.string().max(50, 'State must not exceed 50 characters').optional().or(z.literal('')),

  country: z.string().max(50, 'Country must not exceed 50 characters').optional().or(z.literal('')),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
