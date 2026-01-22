interface HighlightCardProps {
    title: string;
    value: string;
    description: string;
    badge?: {
        label: string;
        variant: 'positive' | 'neutral';
    };
}

export default function HighlightCard({ title, value, description, badge }: HighlightCardProps) {
    const badgeBgColor = badge?.variant === 'positive' ? 'bg-[#e8f8ee]' : 'bg-grey-light';
    const badgeTextColor = badge?.variant === 'positive' ? 'text-[#27ae60]' : 'text-secondary';

    return (
        <div className="relative flex flex-col gap-3 p-4 border border-grey-button rounded-lg">
            <p className="text-xs text-black">{title}</p>
            <p className="text-2xl font-semibold text-black">{value}</p>
            <p className="text-xs text-black">{description}</p>
            {badge && (
                <div className={`absolute top-3 right-4 inline-flex items-center justify-center px-1 py-0.5 rounded text-[10px] ${badgeBgColor} ${badgeTextColor}`}>
                    {badge.label}
                </div>
            )}
        </div>
    );
}
