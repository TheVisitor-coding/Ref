import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import SessionsClient from "@/components/organisms/sessions/SessionsClient";
import { fetchCoachAthleteById } from "@/services/athleteService";
import { fetchSessionsForAthlete } from "@/services/sessionService";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function SessionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const athleteId = Number(id);

    const qc = new QueryClient();

    if (!Number.isFinite(athleteId)) {
        notFound();
    }

    const athlete = await fetchCoachAthleteById(athleteId);

    if (!athlete) {
        notFound();
    }

    await qc.prefetchQuery({
        queryKey: ['athleteSessions', athleteId],
        queryFn: async () => {
            const sessions = await fetchSessionsForAthlete(athleteId);
            return { data: sessions };
        }
    })

    return (
        <DashboardLayout withoutPadding>
            <HydrationBoundary state={dehydrate(qc)}>
                <SessionsClient
                    athleteId={athleteId}
                    athlete={athlete}
                />
            </HydrationBoundary>
        </DashboardLayout>
    );
}

export default SessionsPage;