import { useQuery } from "@tanstack/react-query"

/**
 * Hook to manage user permissions based on role
 */
const usePermissions = () => {
    const { isLoading, isError, data, error} = useQuery({
        queryKey: ['permissions'],
        queryFn: async () => {
            const response = await fetch('api/permissions', {
                credentials: 'include',
                method: 'GET'
            })
            if (!response.ok) {
                throw new Error('Failed to fetch permissions')
            }
            return response.json() as Promise<{
                userId: number,
                role: 'coach' | 'athlete',
                permissions: string[]
            }>
        },
        staleTime: 5 * 60 * 1000,
        retry: 1
    })

    return {
        userId: data?.userId,
        role: data?.role,
        permissions: data?.permissions || [],
        isCoach: data?.role === 'coach',
        isAthlete: data?.role === 'athlete',
        isLoading,
        isError,
        error
    }
}

export default usePermissions;