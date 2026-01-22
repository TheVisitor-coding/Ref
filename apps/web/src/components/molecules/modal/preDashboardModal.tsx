'use client';

import { useSlideUpAnimation } from "@/hooks/animations/useSlideUpAnimation";
import DashboardHeader from "@/components/molecules/dashboard-header/DashboardHeader";
import NotificationCard from "@/components/molecules/notification-card/NotificationCard";

interface Notification {
    id: string;
    title: string;
    description: string;
    urgencyLevel: 'urgent' | 'normal' | 'low';
}

interface PreDashboardModalProps {
    userName?: string;
    messageCount?: number;
    urgentCount?: number;
    notifications?: Notification[];
}

function PreDashboardModal({
    userName = "Prénom",
    messageCount = 17,
    urgentCount = 2,
    notifications = [
        {
            id: '1',
            title: "Théo demande de déplacer sa séance de 11h.",
            description: "Vous êtes tous les deux disponibles à 16h. Je peux modifier la séance dans vos 2 plannings.",
            urgencyLevel: 'urgent',
        },
        {
            id: '2',
            title: "Nouveau message de Marie",
            description: "Marie a envoyé une question concernant son programme d'entraînement.",
            urgencyLevel: 'normal',
        }
    ]
}: PreDashboardModalProps) {
    const modalRef = useSlideUpAnimation(0.8, 0.5)

    return (
        <div
            ref={modalRef}
            className="max-w-3xl bg-white w-full h-fit max-h-[38rem] min-h-96 rounded-t-3xl outline-[12px] outline-white/20 relative overflow-y-auto"
        >
            <DashboardHeader
                userName={userName}
                messageCount={messageCount}
                urgentCount={urgentCount}
            />

            <div className="px-10 pb-10 space-y-4">
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        description={notification.description}
                        urgencyLevel={notification.urgencyLevel}
                    />
                ))}
            </div>
        </div>
    );
}

export default PreDashboardModal