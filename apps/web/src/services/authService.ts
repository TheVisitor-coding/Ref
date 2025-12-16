import type { User } from '@/types/User';

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    message: string;
}

export interface AuthMeResponse {
    authenticated: boolean;
    user: User | null;
    error?: string;
}

interface ApiErrorResponse {
    error?: {
        status?: number;
        name?: string;
        message?: string;
        details?: unknown;
    };
}

export class AuthError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number,
        public details?: unknown
    ) {
        super(message);
        this.name = 'AuthError';
    }
}

async function handleApiError(response: Response): Promise<never> {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({}));
    throw new AuthError(
        errorData.error?.message || 'An error occurred',
        errorData.error?.name || 'UNKNOWN_ERROR',
        response.status,
        errorData.error?.details
    );
}

export async function registerCoach(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
}

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
}

export async function getCurrentUser(): Promise<AuthMeResponse> {
    const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
    });
    return response.json();
}

export async function logoutUser(): Promise<{ success: boolean }> {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
    });
    return response.json();
}