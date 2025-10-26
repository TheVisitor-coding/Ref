'use client'

import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { useApi } from "@/hooks/useApi";
import { Athlete } from "@/types/User";
import Image from "next/image";

function AthleteClient({ athleteId }: { athleteId: number }) {
    type AthleteResponse = { data: Athlete };

    const STRAPI_BASE_URL = process.env.STRAPI_INTERNAL_URL || 'http://backend:1337';

    const { data, isLoading, error } = useApi<AthleteResponse>(
        ['athlete', athleteId], `/api/athletes/${athleteId}`,
        { credentials: 'include' },
        { refetchOnMount: false, refetchOnWindowFocus: false }
    )

    const athlete = data?.data;

    return (
        <>
            <Breadcrumbs
                items={[
                    { label: "Sportifs", href: "/athletes", icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} /> },
                    { label: `${athlete?.first_name} ${athlete?.last_name}`, href: `/athletes/${athlete?.id}`, icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} /> }
                ]}
            />

            <div className="flex justify-between items-center [&>span]:flex [&>span]:gap-4 [&>span]:items-center">
                <span className="">
                    <Image src={`${STRAPI_BASE_URL}${athlete?.avatar.url}`} alt="Athlete Avatar" width={48} height={48} className="w-12 h-12 rounded-lg" />
                    <h1 className="text-[32px] text-primary font-semibold">{athlete?.first_name} {athlete?.last_name}</h1>
                </span>

                <span className="">
                    <SecondaryButton label="Envoyer un message" onClick={() => { /* TODO: Implement message functionality */ }} />
                    <PrimaryButton label="Ajouter un entraînement" onClick={() => { /* TODO: Implement add training functionality */ }} />
                </span>
            </div>

        </>
    );
}

export default AthleteClient;