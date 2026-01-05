import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import AgendaClient from "@/components/organisms/agenda/AgendaClient";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCoachEvents } from "@/services/eventService";

export default async function AgendaPage() {
    const qc = new QueryClient();

    await qc.prefetchQuery({
        queryKey: ['coachEvents'],
        queryFn: async () => {
            const data = await fetchCoachEvents();
            return { data };
        },
    });

    return (
        <DashboardLayout>
            <HydrationBoundary state={dehydrate(qc)}>
                <AgendaClient />
            </HydrationBoundary>
        </DashboardLayout>
    );
}
