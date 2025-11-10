import axios, { AxiosError } from 'axios';
import type {
  Customer,
  CreateCustomerDTO,
  UpdateCustomerDTO,
  ApiResponse,
  PaginatedResponse,
  ApiError,
} from '../types/customer';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Add loading state or auth token here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      status: 'error',
      message: error.response?.data?.message || error.message || 'An error occurred',
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);

// Customer API endpoints
export const customerApi = {
  // Get all customers
  getAll: async (limit = 50, offset = 0): Promise<PaginatedResponse<Customer>> => {
    const response = await api.get<PaginatedResponse<Customer>>('/api/customers', {
      params: { limit, offset },
    });
    return response.data;
  },

  // Get customer by ID
  getById: async (id: string): Promise<ApiResponse<Customer>> => {
    const response = await api.get<ApiResponse<Customer>>(`/api/customers/${id}`);
    return response.data;
  },

  // Create customer
  create: async (data: CreateCustomerDTO): Promise<ApiResponse<Customer>> => {
    const response = await api.post<ApiResponse<Customer>>('/api/customers', data);
    return response.data;
  },

  // Update customer
  update: async (id: string, data: UpdateCustomerDTO): Promise<ApiResponse<Customer>> => {
    const response = await api.put<ApiResponse<Customer>>(`/api/customers/${id}`, data);
    return response.data;
  },

  // Delete customer
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/customers/${id}`);
  },
};

export default api;
