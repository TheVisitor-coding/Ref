import { CoachEvent } from '@/types/CoachEvent';
import { CalendarEvent } from '@/components/molecules/calendar/FullCalendarWrapper';
import { eventColorMap } from '@/data/eventColors';
import { getNextDay } from '@/utils/date';

/**
 * Transform a CoachEvent from Strapi to a FullCalendar CalendarEvent.
 */
export function transformToCalendarEvent(event: CoachEvent): CalendarEvent {
    const colors = eventColorMap[event.color] || eventColorMap.blue;

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
