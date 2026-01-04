'use client';

import { useRouter } from "next/navigation";
import Card from "../Card";
import AgendaEventCard from "../event/AgendaEventCard";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { useDashboardEvents, DateRangeType } from "@/hooks/useDashboardEvents";
import { formatTimeDisplay } from "@/utils/date";
import CardSkeleton from "../../skeleton/CardSkeleton";

interface AgendaCardProps {
    range?: DateRangeType;
}

function AgendaCardEmpty() {
    return (
        <div className="flex w-full items-center justify-center py-8 text-secondary">
            Aucun événement prévu aujourd&apos;hui
        </div>
    );
}

function AgendaCard({ range = 'today' }: AgendaCardProps) {
    const router = useRouter();
    const { events, isLoading, isEmpty } = useDashboardEvents({ range });

    const mockParticipants = [
        { name: 'Paul', image: '/users/profil-pic.png' },
        { name: 'Antoine', image: '/users/profil-pic.png' }
    ];

    const title = range === 'today' ? "Aujourd'hui" : "Cette semaine";

    return (
        <Card className="py-6 pl-6 gap-6 flex flex-col bg-white border-[1px] border-grey-button w-full">
            <div className="w-full flex items-center justify-between pr-6">
                <h2 className="text-primary text-lg font-semibold">{title}</h2>
                <SecondaryButton
                    onClick={() => router.push('/agenda')}
                    label="Ouvrir l'agenda"
                />
            </div>

            <div className="w-full relative flex gap-4 overflow-x-auto pr-6">
                {isLoading && <CardSkeleton />}
                {!isLoading && isEmpty && <AgendaCardEmpty />}
                {!isLoading && !isEmpty && events.map((event) => (
                    <AgendaEventCard
                        key={event.documentId}
                        title={event.title}
                        location={event.location || 'Aucun lieu'}
                        startTime={formatTimeDisplay(event.startTime)}
                        endTime={formatTimeDisplay(event.endTime)}
                        participants={mockParticipants}
                    />
                ))}
            </div>
        </Card>
    );
}

export default AgendaCard;