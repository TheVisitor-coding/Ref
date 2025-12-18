import type { User } from './User';

export interface SignupRequestType {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestType {
  identifier: string;
  password: string;
}

export interface AuthResponseType {
  user: User;
  message: string;
}

export interface AuthMeResponseType {
  authenticated: boolean;
  user: User | null;
  error?: string;
}

export interface AuthErrorType {
  status: number;
  name: string;
  message: string;
  details?: {
    errors?: Array<{
      field: string;
      message: string;
      code: string;
    }>;
    [key: string]: unknown;
  };
}