'use client';

import { useMemo } from 'react';
import { useCoachEvents } from './useCoachEvents';
import { CoachEvent } from '@/types/CoachEvent';
import { isSameDay, isDateInRange, getWeekStart, getWeekEnd } from '@/utils/date';

type DateRangeType = 'today' | 'week';

interface UseDashboardEventsOptions {
    range?: DateRangeType;
    referenceDate?: Date;
}

function filterEventsByRange(
    events: CoachEvent[],
    range: DateRangeType,
    referenceDate: Date
): CoachEvent[] {
    if (range === 'today') {
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            return isSameDay(eventDate, referenceDate);
        });
    }

    if (range === 'week') {
        const weekStart = getWeekStart(referenceDate);
        const weekEnd = getWeekEnd(weekStart);
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            return isDateInRange(eventDate, weekStart, weekEnd);
        });
    }

    return events;
}

function sortEventsByTime(events: CoachEvent[]): CoachEvent[] {
    return [...events].sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.startTime.localeCompare(b.startTime);
    });
}

export function useDashboardEvents(options: UseDashboardEventsOptions = {}) {
    const { range = 'today', referenceDate = new Date() } = options;

    const { events, isLoading, isError, error } = useCoachEvents();

    const filteredEvents = useMemo(() => {
        if (!events.length) return [];
        const filtered = filterEventsByRange(events, range, referenceDate);
        return sortEventsByTime(filtered);
    }, [events, range, referenceDate]);

    return {
        events: filteredEvents,
        isLoading,
        isError,
        error,
        isEmpty: !isLoading && filteredEvents.length === 0,
    };
}

export type { DateRangeType };
