'use client';

import { useApi } from './useApi';
import { CoachEvent, EventColor } from '@/types/CoachEvent';
import { CalendarEvent } from '@/components/molecules/calendar/FullCalendarWrapper';

interface CoachEventsResponse {
    data: CoachEvent[];
}

const eventColorMap: Record<EventColor, { backgroundColor: string; borderColor: string; textColor: string }> = {
    red: { backgroundColor: '#FEE2E2', borderColor: '#EF4444', textColor: '#B91C1C' },
    orange: { backgroundColor: '#FFEDD5', borderColor: '#F97316', textColor: '#C2410C' },
    yellow: { backgroundColor: '#FEF9C3', borderColor: '#EAB308', textColor: '#A16207' },
    green: { backgroundColor: '#DCFCE7', borderColor: '#22C55E', textColor: '#15803D' },
    blue: { backgroundColor: '#DBEAFE', borderColor: '#3B82F6', textColor: '#1D4ED8' },
    purple: { backgroundColor: '#F3E8FF', borderColor: '#A855F7', textColor: '#7E22CE' },
    gray: { backgroundColor: '#F3F4F6', borderColor: '#6B7280', textColor: '#374151' },
};

function transformToCalendarEvent(event: CoachEvent): CalendarEvent {
    const colors = eventColorMap[event.color] || eventColorMap.blue;

    const getNextDay = (dateStr: string): string => {
        const date = new Date(dateStr + 'T12:00:00');
        date.setDate(date.getDate() + 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const startDateTime = event.isAllDay
        ? `${event.date}T08:00:00`
        : `${event.date}T${event.startTime}`;

    const endDateTime = event.isAllDay
        ? `${event.date}T18:00:00`
        : `${event.date}T${event.endTime}`;

    const endDateForMonth = event.isAllDay ? getNextDay(event.date) : undefined;

    return {
        id: event.documentId,
        title: event.title,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        display: event.isAllDay ? 'block' : 'auto',
        ...(event.isAllDay && { endForMonth: endDateForMonth }),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        textColor: colors.textColor,
        extendedProps: {
            documentId: event.documentId,
            eventType: event.eventType,
            color: event.color,
            location: event.location,
            description: event.description,
            isRecurring: event.is_recurring,
            recurrence: event.recurrence,
            isAllDay: event.isAllDay,
        },
    };
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
