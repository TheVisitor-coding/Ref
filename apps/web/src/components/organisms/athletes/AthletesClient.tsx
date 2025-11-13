'use client';

import DataTable from '@/components/molecules/table/DataTable';
import { columns } from '@/components/molecules/table/athletes/Columns';
import { Athlete } from '@/types/User';
import { useApi } from '@/hooks/useApi';
import TableSkeleton from '@/components/molecules/skeleton/TableSkeleton';
import { useRouter } from 'next/navigation';

export default function AthletesClient() {
    type AthletesResponse = { data: Athlete[] };
    const router = useRouter();

    const { data, isLoading, error } = useApi<AthletesResponse>(
        ['athletes'], '/api/athletes',
        { credentials: 'include' },
        { refetchOnMount: false, refetchOnWindowFocus: false }
    )

    if (isLoading) return <TableSkeleton />;
    if (error) return <p className="text-red-600">Erreur lors du chargement.</p>;

    const athletes = data?.data ?? [];
    return <DataTable columns={columns} data={athletes} onRowClick={(ath) => router.push(`/athletes/${ath.id}`)} />;
}
