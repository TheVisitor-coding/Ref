import { useApi } from './useApi';
import { AthleteInvoice } from '@/types/Invoice';

export function useCoachInvoices() {
    const result = useApi<{ data: AthleteInvoice[] }>(
        ['invoices'],
        '/api/invoices',
        {},
        {
            staleTime: 1000 * 60, // 1 minute
        }
    );

    return {
        ...result,
        data: result.data?.data || [],
    };
}
