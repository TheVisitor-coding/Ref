'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useApi<TData = unknown>(
    key: any[],
    input: RequestInfo,
    init?: RequestInit,
    options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
    return useQuery<TData>({
        queryKey: key,
        queryFn: async () => {
            const res = await fetch(input, { credentials: 'include', ...init });
            if (!res.ok) {
                const err = await safeJson(res);
                throw new Error(err?.error || `Request failed: ${res.status}`);
            }
            return res.json();
        },
        staleTime: 30_000,
        retry: 1,
        ...options,
    });
}

async function safeJson(res: Response) {
    try { return await res.json(); } catch { return null; }
}
