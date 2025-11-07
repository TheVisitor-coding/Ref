'use client';

import LayoutCard from "@/components/molecules/card/LayoutCard";
import PerformanceChart from "@/components/molecules/charts/PerformanceChart";
import TrainingLoadChart from "@/components/molecules/charts/TrainingLoadChart";
import ScheduleSessionItem, { ScheduleSessionTag } from "@/components/molecules/schedule/ScheduleSessionItem";

function ChartsSection() {

    const recordPersonal: { title: string; tags: ScheduleSessionTag[] }[] = [
        {
            title: "1km: 3'15",
            tags: [
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
        {
            title: "5km: 18'30",
            tags: [
                { label: "15/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
        {
            title: "10km: 39'45 (bizarre le temps)",
            tags: [
                { label: "18/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
        {
            title: "Semi-marathon: 1'32'13",
            tags: [
                { label: "18/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        }
    ];


    return (
        <section className="flex w-full gap-6">
            <div className="flex flex-[2] flex-col gap-6">
                <LayoutCard title="Charge d'entrainement">
                    <div className="p-6">
                        <TrainingLoadChart />
                    </div>
                </LayoutCard>

                <LayoutCard title="Suivi de performance">
                    <div className="p-6">
                        <PerformanceChart />
                    </div>
                </LayoutCard>

                <LayoutCard title="Suivi et ressenti">
                    <div className="p-6">
                        <p>Aucune information disponible.</p>
                    </div>
                </LayoutCard>
            </div>
            <div className="flex flex-[1] flex-col gap-6">
                <LayoutCard title="Séances à venir">
                    <div className="flex flex-col gap-6 p-6 text-primary">
                        {recordPersonal.map(({ title, tags }, index) => (
                            <ScheduleSessionItem key={`${title}-${index}`} title={title} tags={tags} />
                        ))}
                    </div>
                </LayoutCard>
            </div>

        </section>
    );
}

export default ChartsSection;