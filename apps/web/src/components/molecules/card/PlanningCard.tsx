'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PlanningCardProps {
    athleteId: number;
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const CALENDAR_DATA = [
    { day: 12, hasIndicator: false },
    { day: 13, hasIndicator: true },
    { day: 14, hasIndicator: true },
    { day: 15, hasIndicator: false },
    { day: 16, hasIndicator: true, selected: true },
    { day: 17, hasIndicator: true },
    { day: 18, hasIndicator: false },
    { day: 19, hasIndicator: true },
    { day: 20, hasIndicator: false },
    { day: 21, hasIndicator: false },
    { day: 22, hasIndicator: true },
    { day: 23, hasIndicator: true },
    { day: 24, hasIndicator: false },
    { day: 25, hasIndicator: false },
];

function CalendarDay({
    value,
    hasIndicator = false,
    selected = false
}: {
    value: number;
    hasIndicator?: boolean;
    selected?: boolean;
}) {
    if (selected) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center h-9 rounded-xl bg-primary relative">
                <span className="text-base font-medium text-white">{value}</span>
                {hasIndicator && (
                    <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 size-1 rounded-full bg-white" />
                )}
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center h-9 rounded-xl relative">
            <span className="text-base font-medium text-primary">{value}</span>
            {hasIndicator && (
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 size-1 rounded-full bg-secondary" />
            )}
        </div>
    );
}

export default function PlanningCard({ athleteId }: PlanningCardProps) {
    const firstWeek = CALENDAR_DATA.slice(0, 7);
    const secondWeek = CALENDAR_DATA.slice(7, 14);

    return (
        <div className="relative rounded-2xl p-10 overflow-hidden bg-primary-blue">
            <Image src={"/background-gradient.svg"} alt="Background gradient" fill className="absolute inset-0 object-cover opacity-90" />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4">
                <h2 className="font-poppins text-[40px] font-semibold leading-tight text-white">
                    Planning
                </h2>
                <Link
                    href={`/athletes/${athleteId}/sessions`}
                    className="inline-flex items-center justify-center px-3 py-2 bg-white rounded-lg border-b-2 border-grey-button text-sm font-medium text-primary-blue hover:bg-gray-50 transition-colors w-fit"
                >
                    Consulter le planning
                </Link>
            </div>

            {/* Decorative calendar */}
            <div className="absolute top-14 -right-8 w-[400px] bg-white rounded-2xl outline-8 outline-white/30 p-6" style={{ backgroundImage: 'linear-gradient(165deg, rgba(255, 255, 255, 0.16) 45.32%, rgba(255, 255, 255, 0.80) 97.88%)' }}>
                <div className="flex flex-col">
                    {/* Days header */}
                    <div className="flex items-center">
                        {DAYS.map((day) => (
                            <div key={day} className="flex-1 flex items-center justify-center h-9">
                                <span className="text-sm text-secondary">{day}</span>
                            </div>
                        ))}
                    </div>

                    {/* First week */}
                    <div className="flex items-center">
                        {firstWeek.map((item) => (
                            <CalendarDay
                                key={item.day}
                                value={item.day}
                                hasIndicator={item.hasIndicator}
                                selected={item.selected}
                            />
                        ))}
                    </div>

                    {/* Second week */}
                    <div className="flex items-center">
                        {secondWeek.map((item) => (
                            <CalendarDay
                                key={item.day}
                                value={item.day}
                                hasIndicator={item.hasIndicator}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
