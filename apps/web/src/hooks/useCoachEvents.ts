'use client';

import { useApi } from './useApi';
import { CoachEvent } from '@/types/CoachEvent';
import { CalendarEvent } from '@/components/molecules/calendar/FullCalendarWrapper';
import { transformToCalendarEvent } from '@/lib/calendar';

interface CoachEventsResponse {
    data: CoachEvent[];
}

export function useCoachEvents() {
    const query = useApi<CoachEventsResponse>(
        ['coachEvents'],
        '/api/events',
        { method: 'GET' },
        { staleTime: 60_000 }
    );

    const calendarEvents: CalendarEvent[] = query.data?.data
        ? query.data.data.map(transformToCalendarEvent)
        : [];

    return {
        ...query,
        events: query.data?.data || [],
        calendarEvents,
    };
}
