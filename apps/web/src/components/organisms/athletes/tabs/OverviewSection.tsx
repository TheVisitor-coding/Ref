import LayoutCard from "@/components/molecules/card/LayoutCard";
import HighlightItem from "@/components/molecules/highlight/HighlightItem";
import InfoRow from "@/components/molecules/info/InfoRow";
import ScheduleSessionItem, { type ScheduleSessionTag } from "@/components/molecules/schedule/ScheduleSessionItem";
import { formatDateLocalized, formatMeasurement, formatOptional } from "@/utils/format";
import { Athlete } from "@/types/User";
import { AlertTriangle, ClipboardListIcon, MessageCircle } from "lucide-react";

type OverviewSectionProps = {
    athlete: Athlete;
};

const OverviewSection = ({ athlete }: OverviewSectionProps) => {
    const generalInfoRows = [
        {
            key: "contact",
            padding: "p-6",
            items: [
                { label: "Email", value: formatOptional(athlete.email) },
                { label: "Téléphone", value: formatOptional(athlete.phone) },
                { label: "Profession", value: formatOptional(athlete.profession) },
            ],
        },
        {
            key: "metrics",
            padding: "px-6 pb-6",
            items: [
                { label: "Taille", value: formatMeasurement(athlete.height, "cm") },
                { label: "Âge", value: formatOptional(athlete.age) },
                { label: "Niveau", value: formatOptional(athlete.level) },
            ],
        },
        {
            key: "status",
            padding: "px-6 pb-6",
            items: [
                { label: "Inscription", value: formatDateLocalized(athlete.createdAt) },
                { label: "Statut d'activité", value: formatOptional(athlete.status) },
                { label: "Objectif", value: formatOptional(athlete.objective) },
            ],
        },
    ];

    const performanceMetrics = [
        { label: "Distance", value: "120 km" },
        { label: "Temps", value: "6 h 30 min" },
        { label: "Dénivelé", value: "1 200 m" },
    ];

    const vigilanceItems = [
        { icon: MessageCircle, title: "Message non lus", subtitle: "Répondez à votre sportif !" },
        { icon: AlertTriangle, title: "Douleurs au genou", subtitle: "Signalé le 10 octobre" },
        {
            icon: ClipboardListIcon,
            title: "Retard",
            subtitle: "Plusieurs séances n’ont pas été respectées",
        },
    ];

    const upcomingSessions: { title: string; tags: ScheduleSessionTag[] }[] = [
        {
            title: "Nom de séance mais vraiment trèèèsss longuee ??",
            tags: [
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
        {
            title: "Nom de séance mais vraiment trèèèsss longuee ??",
            tags: [
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
        {
            title: "Nom de séance mais vraiment trèèèsss longuee ??",
            tags: [
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
                { label: "12/09/2023", icon: "/icons/Clock.svg", iconAlt: "Horloge" },
            ],
        },
    ];

    return (
        <section className="flex w-full gap-6">
            <div className="flex flex-[2] flex-col gap-6">
                <LayoutCard title="Informations générales">
                    <div className="flex flex-col">
                        {generalInfoRows.map(({ key, padding, items }) => (
                            <InfoRow key={key} items={items} className={padding} />
                        ))}
                    </div>
                </LayoutCard>

                <LayoutCard title="Suivi de performance">
                    <InfoRow items={performanceMetrics} className="p-6" />
                </LayoutCard>
            </div>
            <div className="flex flex-[1] flex-col gap-6">
                <LayoutCard title="Points de vigilance">
                    <div className="flex flex-col gap-6 p-6 text-primary">
                        {vigilanceItems.map(({ icon, title, subtitle }) => (
                            <HighlightItem key={title} icon={icon} title={title} subtitle={subtitle} />
                        ))}
                    </div>
                </LayoutCard>

                <LayoutCard title="Séances à venir">
                    <div className="flex flex-col gap-6 p-6 text-primary">
                        {upcomingSessions.map(({ title, tags }, index) => (
                            <ScheduleSessionItem key={`${title}-${index}`} title={title} tags={tags} />
                        ))}
                    </div>
                </LayoutCard>
            </div>

        </section>
    );
};

export default OverviewSection;
