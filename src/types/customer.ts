export interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  dateCreated: string;
}

export interface CreateCustomerDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

// Use type alias instead of empty interface
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
  };
}

export interface ApiError {
  status: string;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export type ViewMode = 'table' | 'card';
