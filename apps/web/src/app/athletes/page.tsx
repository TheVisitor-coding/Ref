import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import Image from "next/image";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCoachAthletesServer } from "@/services/athleteService";
import AthletesClient from "@/components/organisms/athletes/AthletesClient";
import AddAthleteModal from "@/components/molecules/modal/addAthleteModal";

export default async function AthletesPage() {
    const qc = new QueryClient();

    await qc.prefetchQuery({
        queryKey: ['athletes'],
        queryFn: async () => {
            const data = await fetchCoachAthletesServer();
            return { data };
        },
    });

    return (
        <DashboardLayout>
            <Breadcrumbs
                items={[
                    { label: "Sportifs", href: "/athletes", icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} /> },
                ]}
            />

            <div className="flex justify-between items-center">
                <h1 className="text-[32px] text-primary font-semibold">Mes clients</h1>
                <AddAthleteModal />
            </div>

            <HydrationBoundary state={dehydrate(qc)}>
                <AthletesClient />
            </HydrationBoundary>
        </DashboardLayout>
    );
}
