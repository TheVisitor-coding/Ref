import Chip from "@/components/atoms/chip/Chip";

interface DashboardHeaderProps {
    greeting?: string;
    userName: string;
    messageCount: number;
    urgentCount: number;
    className?: string;
}

const DashboardHeader = ({
    greeting = 'Bonjour',
    userName,
    messageCount,
    urgentCount,
    className = ''
}: DashboardHeaderProps) => {
    return (
        <div className={`p-10 ${className}`}>
            <p className="text-secondary text-[1.125rem] leading-tight">{greeting}</p>
            <h1 className="text-primary text-[2.5rem] font-semibold">{userName}</h1>

            <div className="flex gap-2 text-base text-secondary items-center flex-wrap">
                <p>Depuis votre dernière connexion, vous avez</p>

                <Chip icon="/icons/chat.svg" iconAlt="chat icon">
                    <p>{messageCount} messages</p>
                </Chip>

                <p>et</p>

                <Chip icon="/icons/chat.svg" iconAlt="urgence icon">
                    <p>{urgentCount} urgences à traiter</p>
                </Chip>
            </div>
        </div>
    );
};

export default DashboardHeader;
