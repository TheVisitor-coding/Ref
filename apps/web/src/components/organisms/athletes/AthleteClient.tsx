'use client'

import { type ComponentType } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApi } from "@/hooks/useApi";
import { Athlete } from "@/types/User";
import Image from "next/image";
import CalendarSection from "./tabs/CalendarSection";
import InvoicesSection from "./tabs/InvoicesSection";
import OverviewSection from "./tabs/OverviewSection";

type AthleteResponse = { data: Athlete };

type AthleteTabComponent = ComponentType<{ athlete: Athlete }>;

type AthleteTabDefinition = {
    value: string;
    label: string;
    Component: AthleteTabComponent;
};

const athleteTabs: AthleteTabDefinition[] = [
    { value: "overview", label: "Vue d'ensemble", Component: OverviewSection },
    { value: "calendar", label: "Calendrier", Component: CalendarSection },
    { value: "invoices", label: "Factures", Component: InvoicesSection },
];

function AthleteClient({ athleteId }: { athleteId: number }) {
    const STRAPI_BASE_URL = process.env.STRAPI_INTERNAL_URL || "http://backend:1337";

    const { data, isLoading, error } = useApi<AthleteResponse>(
        ["athlete", athleteId],
        `/api/athletes/${athleteId}`,
        { credentials: "include" },
        { refetchOnMount: false, refetchOnWindowFocus: false }
    );

    const athlete = data?.data;

    if (!athlete) {
        return <div className="mt-8 text-sm text-muted-foreground">Aucune donnée athlète disponible.</div>;
    }

    const avatarUrl = athlete.avatar?.url
        ? `${STRAPI_BASE_URL}${athlete.avatar.url}`
        : "/icons/Account.svg";

    return (
        <>
            <Breadcrumbs
                items={[
                    {
                        label: "Sportifs",
                        href: "/athletes",
                        icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} />,
                    },
                    {
                        label: `${athlete.first_name ?? ""} ${athlete.last_name ?? ""}`.trim() || athlete.username,
                        href: `/athletes/${athlete.id}`,
                        icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} />,
                    },
                ]}
            />

            <div className="flex items-center justify-between gap-6 max-lg:flex-col max-lg:items-start">
                <div className="flex items-center gap-4">
                    <Image src={avatarUrl} alt="Athlete Avatar" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                    <h1 className="text-[32px] font-semibold text-primary">
                        {`${athlete.first_name ?? ""} ${athlete.last_name ?? ""}`.trim() || athlete.username}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <SecondaryButton label="Envoyer un message" onClick={() => { /* TODO: Implement message functionality */ }} />
                    <PrimaryButton label="Ajouter un entraînement" onClick={() => { /* TODO: Implement add training functionality */ }} />
                </div>
            </div>

            <Tabs defaultValue={athleteTabs[0]?.value} className="">
                <TabsList className="flex w-full items-center border-b border-grey-button">
                    {athleteTabs.map(({ value, label }) => (
                        <TabsTrigger key={value} value={value} className="w-fit cursor-pointer px-3 pt-1 pb-2 border-0 text-sm text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary-blue data-[state=active]:font-medium data-[state=active]:text-primary-blue transition-all">
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {athleteTabs.map(({ value, Component }) => (
                    <TabsContent key={value} value={value} className="mt-6">
                        <Component athlete={athlete} />
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
}

export default AthleteClient;