'use client';

import CalendarDay from "@/components/atoms/calendar/CalendarDay";
import { sportConfig } from "@/data/sports/sportsList";

export interface DayData {
    dayName: string;
    dayNumber: number;
    date: Date;
    isSelected?: boolean;
    isPast?: boolean;
    isToday?: boolean;
    sessionTag?: {
        label: string;
        sportType: keyof typeof sportConfig;
    };
}

interface WeekCalendarProps {
    days: DayData[];
    onDayClick: (date: Date) => void;
}

function WeekCalendar({ days, onDayClick }: WeekCalendarProps) {
    return (
        <div className="flex gap-2 items-start justify-center w-full">
            {days.map((day, index) => {
                const sessionConfig = day.sessionTag
                    ? {
                        label: day.sessionTag.label,
                        icon: sportConfig[day.sessionTag.sportType]?.icon,
                        bgColor: sportConfig[day.sessionTag.sportType].bgColor,
                        textColor: sportConfig[day.sessionTag.sportType].textColor
                    }
                    : undefined;

                return (
                    <CalendarDay
                        key={index}
                        dayName={day.dayName}
                        dayNumber={day.dayNumber}
                        isSelected={day.isSelected}
                        isPast={day.isPast}
                        isToday={day.isToday}
                        sessionTag={sessionConfig}
                        onClick={() => onDayClick(day.date)}
                    />
                );
            })}
        </div>
    );
}

export default WeekCalendar;
