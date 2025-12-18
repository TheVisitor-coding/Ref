'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/AuthStore';
import { signupSchema, loginSchema } from '@/schema/AuthSchema';
import {
    registerCoach,
    loginUser,
    getCurrentUser,
    logoutUser,
    type RegisterRequest,
    type LoginRequest,
    AuthError,
} from '@/services/authService';

export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
};

export function useAuth() {
    const { syncFromApi, user, isAuthenticated, isLoading, error } = useAuthStore();

    const query = useQuery({
        queryKey: authKeys.me(),
        queryFn: getCurrentUser,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (query.data) syncFromApi(query.data);
    }, [query.data, syncFromApi]);

    return {
        user: query.data?.user ?? user,
        isAuthenticated: query.data?.authenticated ?? isAuthenticated,
        isLoading: query.isLoading || isLoading,
        error: query.error?.message ?? error,
        refetch: query.refetch,
    };
}

interface UseRegisterOptions {
    onSuccess?: () => void;
    onError?: (error: AuthError) => void;
}

export function useRegister(options?: UseRegisterOptions) {
    const queryClient = useQueryClient();
    const { syncFromApi } = useAuthStore();

    const mutation = useMutation({
        mutationFn: registerCoach,
        onSuccess: (data) => {
            syncFromApi({ authenticated: true, user: data.user });
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            options?.onSuccess?.();
        },
        onError: (error: AuthError) => options?.onError?.(error),
    });

    const register = useCallback(
        (userData: RegisterRequest) => {
            const validation = signupSchema.safeParse(userData);
            if (!validation.success) {
                mutation.reset();
                return { success: false, errors: validation.error.issues, message: validation.error.issues[0].message };
            }
            mutation.mutate(validation.data);
            return { success: true };
        },
        [mutation]
    );

    return {
        register,
        isLoading: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset,
    };
}

interface UseLoginOptions {
    onSuccess?: () => void;
    onError?: (error: AuthError) => void;
    redirectTo?: string;
}

export function useLogin(options?: UseLoginOptions) {
    const queryClient = useQueryClient();
    const { syncFromApi } = useAuthStore();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            syncFromApi({ authenticated: true, user: data.user });
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            options?.onSuccess?.();
            if (options?.redirectTo) router.push(options.redirectTo);
        },
        onError: (error: AuthError) => options?.onError?.(error),
    });

    const login = useCallback(
        (credentials: LoginRequest) => {
            const validation = loginSchema.safeParse(credentials);
            if (!validation.success) {
                return { success: false, errors: validation.error.issues, message: validation.error.issues[0].message };
            }
            mutation.mutate(validation.data);
            return { success: true };
        },
        [mutation]
    );

    return {
        login,
        isLoading: mutation.isPending,
        error: mutation.error?.message ?? null,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset,
    };
}

interface UseLogoutOptions {
    redirectTo?: string;
    onSuccess?: () => void;
}

export function useLogout(options?: UseLogoutOptions) {
    const queryClient = useQueryClient();
    const { logout: clearStore } = useAuthStore();
    const router = useRouter();

    return useCallback(async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearStore();
            queryClient.removeQueries({ queryKey: authKeys.all });
            options?.onSuccess?.();
            if (options?.redirectTo) router.push(options.redirectTo);
        }
    }, [clearStore, queryClient, router, options]);
}

export type { RegisterRequest, LoginRequest };