'use client';

import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

export interface CalendarEvent extends EventInput {
    id: string;
    title: string;
    start: Date | string;
    end?: Date | string;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
}

interface FullCalendarWrapperProps {
    events?: CalendarEvent[];
    view?: CalendarView;
    onDatesChange?: (date: Date, viewType: CalendarView) => void;
    onEventClick?: (event: CalendarEvent) => void;
    onEventDoubleClick?: (event: CalendarEvent) => void;
    calendarRef?: React.RefObject<FullCalendar | null>;
    className?: string;
}

function FullCalendarWrapper({
    events = [],
    view = 'dayGridMonth',
    onDatesChange,
    onEventClick,
    onEventDoubleClick,
    calendarRef: externalRef,
    className = '',
}: FullCalendarWrapperProps) {
    const internalRef = useRef<FullCalendar | null>(null);
    const calendarRef = externalRef || internalRef;

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            if (calendarApi.view.type !== view) {
                calendarApi.changeView(view);
            }
        }
    }, [view, calendarRef]);

    const calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: view,
        locale: frLocale,
        headerToolbar: false,
        events: events,
        height: 'auto',
        dayMaxEvents: 3,
        fixedWeekCount: false,
        showNonCurrentDates: true,
        firstDay: 1,
        // TimeGrid specific options
        slotMinTime: '08:00:00',
        slotMaxTime: '18:00:00',
        slotDuration: '01:00:00',
        slotLabelInterval: '01:00:00',
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        },
        allDaySlot: false,
        nowIndicator: true,
        eventClick: (info) => {
            const event: CalendarEvent = {
                id: info.event.id,
                title: info.event.title,
                start: info.event.start || new Date(),
                end: info.event.end || undefined,
                allDay: info.event.allDay,
                backgroundColor: info.event.backgroundColor,
                borderColor: info.event.borderColor,
                textColor: info.event.textColor,
                extendedProps: info.event.extendedProps,
            };

            if (info.jsEvent.detail === 2 && onEventDoubleClick) {
                onEventDoubleClick(event);
            } else if (onEventClick) {
                onEventClick(event);
            }
        },
        datesSet: (dateInfo) => {
            if (onDatesChange) {
                onDatesChange(dateInfo.view.currentStart, dateInfo.view.type as CalendarView);
            }
        },
        dayCellClassNames: (arg) => {
            const classes: string[] = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (arg.date < today && !arg.isToday) {
                classes.push('fc-day-past');
            }
            return classes;
        },
        dayHeaderFormat: { weekday: 'long' },
        titleFormat: { year: 'numeric', month: 'long' },
    };

    return (
        <div className={`fullcalendar-wrapper ${className}`}>
            <FullCalendar
                ref={calendarRef}
                {...calendarOptions}
            />
        </div>
    );
}

export default FullCalendarWrapper;
