interface CalendarDayProps {
    dayName: string;
    dayNumber: number;
    isSelected?: boolean;
    isPast?: boolean;
    isToday?: boolean;
    sessionTag?: {
        label: string;
        icon: string;
        bgColor: string;
        textColor: string;
    };
    onClick?: () => void;
}

function CalendarDay({
    dayName,
    dayNumber,
    isSelected = false,
    isPast = false,
    isToday = false,
    sessionTag,
    onClick
}: CalendarDayProps) {
    return (
        <button
            onClick={onClick}
            className={`
                flex flex-col gap-2 items-center
                p-4 rounded-lg
                h-[120px] w-[150px]
                transition-all
                ${isSelected ? 'bg-[#F5F5F5]' : 'hover:bg-[#F5F5F5]/50 cursor-pointer'}
                ${isPast ? 'opacity-40' : ''}
                ${isToday ? '' : ''}
            `}

        >
            <div className="flex flex-col gap-0.5 items-center">
                <h3 className="font-poppins font-medium text-[20px] leading-normal text-primary">
                    {dayName}
                </h3>
                <div
                    className={`
                        flex items-center justify-center
                        size-7 rounded-lg p-2
                        ${isToday ? 'bg-primary' : ''}
                    `}
                >
                    <span
                        className={`
                            text-sm font-normal leading-[1.25]
                            ${isToday ? 'text-white' : 'text-secondary'}
                        `}
                    >
                        {dayNumber}
                    </span>
                </div>
            </div>

            {sessionTag && (
                <div
                    className={`
                        flex items-center justify-center gap-1
                        px-1 py-0.5 rounded-sm
                        ${sessionTag.bgColor}
                    `}
                >
                    <div className="w-[13px] h-[13px]">
                        <img src={sessionTag.icon} alt={sessionTag.label} />
                    </div>
                    <span className={`text-[10px] font-normal leading-[1.25] ${sessionTag.textColor}`}>
                        {sessionTag.label}
                    </span>
                </div>
            )}
        </button>
    );
}

export default CalendarDay;
