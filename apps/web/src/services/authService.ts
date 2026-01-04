import type { User } from '@/types/User';
import type { OnboardingDataSchemaType } from '@/schema/AuthSchema';

export interface RegisterRequest {
    email: string;
    password: string;
    onboardingData: OnboardingDataSchemaType;
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
        public details?: unknown,
        public isRetryable: boolean = false
    ) {
        super(message);
        this.name = 'AuthError';
    }
}

function isRetryableError(error: unknown): boolean {
    if (error instanceof AuthError) {
        return error.status >= 500 || error.code === 'NETWORK_ERROR';
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return true;
    }
    return false;
}

function getRetryDelay(attempt: number): number {
    const baseDelay = 1000;
    const maxDelay = 10000;
    const exponentialDelay = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 500;
    return Math.min(exponentialDelay + jitter, maxDelay);
}

async function withRetry<T>(
    fn: () => Promise<T>,
    options: { maxRetries?: number; onRetry?: (attempt: number, error: unknown) => void } = {}
): Promise<T> {
    const { maxRetries = 3, onRetry } = options;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (!isRetryableError(error) || attempt === maxRetries) {
                throw error;
            }

            onRetry?.(attempt + 1, error);
            await new Promise((resolve) => setTimeout(resolve, getRetryDelay(attempt)));
        }
    }

    throw lastError;
}

async function handleApiError(response: Response): Promise<never> {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({}));
    const isRetryable = response.status >= 500;
    throw new AuthError(
        errorData.error?.message || 'An error occurred',
        errorData.error?.name || 'UNKNOWN_ERROR',
        response.status,
        errorData.error?.details,
        isRetryable
    );
}

async function fetchCsrfToken(): Promise<string> {
    const response = await fetch('/api/auth/csrf-token', {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new AuthError('Failed to fetch CSRF token', 'CSRF_ERROR', response.status);
    }
    const data = await response.json();
    return data.csrfToken;
}

export async function registerCoach(data: RegisterRequest): Promise<AuthResponse> {
    return withRetry(
        async () => {
            const csrfToken = await fetchCsrfToken();

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (!response.ok) await handleApiError(response);
            return response.json();
        },
        {
            maxRetries: 2,
            onRetry: (attempt) => {
                console.warn(`Registration attempt ${attempt} failed, retrying...`);
            },
        }
    );
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