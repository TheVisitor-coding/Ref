import IconText from "@/components/atoms/text/IconText";
import Avatar from "@/components/atoms/avatar/Avatar";

interface AgendaEventCardProps {
    title: string;
    location: string;
    startTime: string;
    endTime: string;
    participants: { name: string; image: string }[];
    className?: string;
}

function AgendaEventCard({
    title,
    location,
    startTime,
    endTime,
    participants,
    className = ''
}: AgendaEventCardProps) {
    return (
        <div className={`flex flex-col gap-4 min-w-72 rounded-xl bg-background-light p-6 ${className}`}>
            <h3 className="text-primary text-base font-semibold">{title}</h3>

            <div className="flex flex-col gap-2">
                <IconText
                    icon="/icons/Location.svg"
                    alt="location icon"
                    text={location}
                />
                <IconText
                    icon="/icons/Clock.svg"
                    alt="clock icon"
                    text={`${startTime} - ${endTime}`}
                />
            </div>

            <div className="flex items-center gap-2 text-sm text-disabled">
                <span className="flex -space-x-2">
                    {participants.map((p, index) => (
                        <Avatar
                            key={index}
                            src={p.image}
                            alt={p.name}
                        />
                    ))}
                </span>
                <p>{participants.map(p => p.name).join(', ')}</p>
            </div>
        </div>
    );
}

export default AgendaEventCard;
