import { useQuery } from '@tanstack/react-query';

interface PermissionsResponse {
    userId: number;
    role: 'coach' | 'athlete';
    permissions: string[];
}

const usePermissions = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['permissions'],
        queryFn: async () => {
            const response = await fetch('/api/permissions', {
                credentials: 'include',
                method: 'GET',
            });
            if (!response.ok) throw new Error('Failed to fetch permissions');
            return response.json() as Promise<PermissionsResponse>;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    return {
        userId: data?.userId,
        role: data?.role,
        permissions: data?.permissions || [],
        isCoach: data?.role === 'coach',
        isAthlete: data?.role === 'athlete',
        isLoading,
        isError,
        error,
    };
};

export default usePermissions;