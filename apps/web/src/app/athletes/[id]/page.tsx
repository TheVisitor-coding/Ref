import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import AthleteClient from "@/components/organisms/athletes/AthleteClient";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import { fetchCoachAthleteById } from "@/services/athleteService";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";

async function AthletePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) notFound()


    const qc = new QueryClient();

    await qc.prefetchQuery({
        queryKey: ['athlete', idNum],
        queryFn: async () => {
            const athlete = await fetchCoachAthleteById(idNum);
            if (!athlete) notFound();
            return { data: athlete };
        }
    })

    return (
        <DashboardLayout>
            <HydrationBoundary state={dehydrate(qc)}>
                <AthleteClient athleteId={idNum} />
            </HydrationBoundary>
        </DashboardLayout>
    );
}

export default AthletePage;