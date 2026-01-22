interface StatBadgeProps {
    icon: React.ReactNode;
    value: string | number | React.ReactNode;
    label?: string;
    badge?: {
        value: string;
        variant: 'positive' | 'negative' | 'neutral';
    };
}

function StatBadge({ icon, value, label, badge }: StatBadgeProps) {
    const getBadgeStyles = (variant: 'positive' | 'negative' | 'neutral') => {
        switch (variant) {
            case 'positive':
                return 'bg-[#E8F8EE] text-[#27AE60]';
            case 'negative':
                return 'bg-error-50 text-error';
            case 'neutral':
                return 'bg-grey-light text-secondary';
            default:
                return 'bg-grey-light text-secondary';
        }
    };

    return (
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg">
            <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="flex items-center gap-2">
                <p className="text-base text-primary font-normal whitespace-nowrap">
                    {label ? (
                        <>{label} : {value}</>
                    ) : (
                        value
                    )}
                </p>
                {badge && (
                    <div className={`px-1 py-0.5 rounded ${getBadgeStyles(badge.variant)}`}>
                        <span className="text-xs font-medium whitespace-nowrap">
                            {badge.value}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatBadge;
