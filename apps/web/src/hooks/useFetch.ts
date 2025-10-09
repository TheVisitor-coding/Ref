import { useQuery } from "@tanstack/react-query";

export const useFetch = async (url: string, options: RequestInit = {}, method: string = "GET") => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: [url, options],
        queryFn: async () => {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                method: method
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch from ${url}`);
            }

            return response.json();
        },
        staleTime: 5 * 60 * 1000,
        retry: 1
    });

    return { isLoading, isError, data, error };
}