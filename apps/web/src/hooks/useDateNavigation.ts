import { useState, useMemo } from 'react';

export type PeriodType = 'week' | 'month' | 'year';

interface DateRange {
    start: Date;
    end: Date;
    labels: string[];
}

interface UseDateNavigationReturn {
    currentDate: Date;
    dateRange: DateRange;
    periodDisplay: string;
    navigatePeriod: (direction: 'prev' | 'next') => void;
    setPeriod: (period: PeriodType) => void;
}

export function useDateNavigation(
    initialPeriod: PeriodType = 'week',
    weekLabels: string[],
    yearLabels: string[],
    generateMonthLabels: (days: number) => string[]
): UseDateNavigationReturn {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [period, setPeriod] = useState<PeriodType>(initialPeriod);

    const dateRange = useMemo((): DateRange => {
        const date = new Date(currentDate);

        if (period === 'week') {
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(date.setDate(diff));
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);

            return {
                start: monday,
                end: sunday,
                labels: weekLabels,
            };
        } else if (period === 'month') {
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return {
                start: firstDay,
                end: lastDay,
                labels: generateMonthLabels(lastDay.getDate()),
            };
        } else {
            const firstDay = new Date(date.getFullYear(), 0, 1);
            const lastDay = new Date(date.getFullYear(), 11, 31);

            return {
                start: firstDay,
                end: lastDay,
                labels: yearLabels,
            };
        }
    }, [currentDate, period, weekLabels, yearLabels, generateMonthLabels]);

    const periodDisplay = useMemo(() => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        const start = dateRange.start.toLocaleDateString('fr-FR', options);
        const end = dateRange.end.toLocaleDateString('fr-FR', options);

        if (period === 'year') {
            return dateRange.start.getFullYear().toString();
        }

        return `${start} → ${end}`;
    }, [dateRange, period]);

    const navigatePeriod = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        const increment = direction === 'next' ? 1 : -1;

        if (period === 'week') {
            newDate.setDate(newDate.getDate() + (7 * increment));
        } else if (period === 'month') {
            newDate.setMonth(newDate.getMonth() + increment);
        } else {
            newDate.setFullYear(newDate.getFullYear() + increment);
        }

        setCurrentDate(newDate);
    };

    return {
        currentDate,
        dateRange,
        periodDisplay,
        navigatePeriod,
        setPeriod,
    };
}
