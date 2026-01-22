'use client';

import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

type ApiErrorPayload = { error?: unknown };

const isApiErrorPayload = (value: unknown): value is ApiErrorPayload =>
    typeof value === 'object' && value !== null && 'error' in value;

export function useApi<TData = unknown>(
    key: QueryKey,
    input: RequestInfo | URL,
    init?: RequestInit,
    options?: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, 'queryKey' | 'queryFn'>
) {
    return useQuery<TData, Error, TData, QueryKey>({
        queryKey: key,
        queryFn: async () => {
            const res = await fetch(input, { credentials: 'include', ...init });
            if (!res.ok) {
                const err = await safeJson(res);
                const message = isApiErrorPayload(err) && typeof err.error !== 'undefined'
                    ? String(err.error)
                    : `Request failed: ${res.status}`;
                throw new Error(message);
            }
            return res.json() as Promise<TData>;
        },
        staleTime: 30_000,
        retry: 1,
        ...options,
    });
}

async function safeJson(res: Response): Promise<unknown> {
    try { return await res.json(); } catch { return null; }
}
