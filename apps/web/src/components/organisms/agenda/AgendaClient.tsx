'use client';

import { useRef, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useQueryClient } from '@tanstack/react-query';
import Breadcrumbs from '@/components/atoms/breadcrumb/breadcrumbs';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import FullCalendarWrapper, { CalendarView, CalendarEvent, EventChangeInfo } from '@/components/molecules/calendar/FullCalendarWrapper';
import AgendaActions from '@/components/molecules/calendar/AgendaActions';
import EventModal from '@/components/molecules/modal/EventModal';
import { useCoachEvents } from '@/hooks/useCoachEvents';
import { EventFormInput } from '@/schema/EventSchema';
import Image from 'next/image';
import { Settings, Loader2 } from 'lucide-react';

function formatWeekRange(startDate: Date): string {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short' });
    const yearFormatter = new Intl.DateTimeFormat('fr-FR', { year: 'numeric' });

    const startMonth = monthFormatter.format(startDate);
    const endMonth = monthFormatter.format(endDate);
    const year = yearFormatter.format(endDate);

    if (startDate.getMonth() === endDate.getMonth()) {
        return `Du ${startDay} → ${endDay} ${startMonth} ${year}`;
    }

    return `Du ${startDay} ${startMonth} → ${endDay} ${endMonth} ${year}`;
}

// Helper pour formater la date du jour
function formatDayDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    return formatter.format(date);
}

function AgendaClient() {
    const calendarRef = useRef<FullCalendar | null>(null);
    const queryClient = useQueryClient();
    const [currentView, setCurrentView] = useState<CalendarView>('dayGridMonth');
    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const { calendarEvents, isLoading, isError } = useCoachEvents();

    // État de la modal d'événement
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | undefined>(undefined);
    const [eventModalMode, setEventModalMode] = useState<'create' | 'edit'>('create');
    const [editEventData, setEditEventData] = useState<Partial<EventFormInput> | undefined>(undefined);

    const handleViewChange = useCallback((view: CalendarView) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            if (view === 'timeGridDay') {
                calendarApi.today();
            }
            calendarApi.changeView(view);
        }
    }, []);

    const handleTodayClick = useCallback(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().today();
        }
    }, []);

    const handleNavigatePrev = useCallback(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().prev();
        }
    }, []);

    const handleNavigateNext = useCallback(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().next();
        }
    }, []);

    const handleDatesChange = useCallback((date: Date, viewType: CalendarView) => {
        setCurrentDate(date);
        setCurrentView(viewType);
        if (viewType === 'timeGridDay') {
            setCurrentTitle(formatDayDate(date));
        } else if (viewType === 'timeGridWeek') {
            setCurrentTitle(formatWeekRange(date));
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
            const formatter = new Intl.DateTimeFormat('fr-FR', options);
            setCurrentTitle(formatter.format(date));
        }
    }, []);

    const handleEventClick = useCallback((event: CalendarEvent) => {
        console.log('Event clicked:', event);
    }, []);

    const handleEventDoubleClick = useCallback((event: CalendarEvent) => {
        const props = event.extendedProps || {};

        const formatLocalDate = (d: Date): string => {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const startTime = typeof event.start === 'string'
            ? event.start.split('T')[1]?.substring(0, 5)
            : event.start instanceof Date
                ? event.start.toTimeString().substring(0, 5)
                : '10:00';
        const endTime = typeof event.end === 'string'
            ? event.end.split('T')[1]?.substring(0, 5)
            : event.end instanceof Date
                ? event.end.toTimeString().substring(0, 5)
                : '11:00';
        const eventDate = typeof event.start === 'string'
            ? event.start.split('T')[0]
            : event.start instanceof Date
                ? formatLocalDate(event.start)
                : formatLocalDate(new Date());

        setEditEventData({
            documentId: event.id,
            title: event.title,
            date: eventDate,
            startTime: props.isAllDay ? '10:00' : startTime,
            endTime: props.isAllDay ? '11:00' : endTime,
            isAllDay: props.isAllDay || false,
            location: props.location || '',
            eventType: props.eventType || 'meeting',
            color: props.color || 'blue',
            recurrence: props.recurrence?.type || 'none',
            description: props.description || '',
        });
        setEventModalMode('edit');
        setIsEventModalOpen(true);
    }, []);

    const handleAddEvent = useCallback(() => {
        setEditEventData(undefined);
        setEventModalMode('create');
        const dateForEvent = currentView === 'timeGridDay' ? currentDate : new Date();
        setSelectedDateForEvent(dateForEvent);
        setIsEventModalOpen(true);
    }, [currentDate, currentView]);

    const handleEventModalClose = useCallback((open: boolean) => {
        setIsEventModalOpen(open);
        if (!open) {
            setSelectedDateForEvent(undefined);
            setEditEventData(undefined);
            setEventModalMode('create');
        }
    }, []);

    const handleEventChange = useCallback(async (info: EventChangeInfo) => {
        const formatTime = (date: Date): string => {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const dateChanged = info.oldStart && formatDate(info.start) !== formatDate(info.oldStart);

        try {
            const response = await fetch('/api/events', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentId: info.eventId,
                    ...(dateChanged && { date: formatDate(info.start) }),
                    startTime: formatTime(info.start),
                    endTime: formatTime(info.end),
                }),
            });

            if (!response.ok) {
                info.revert();
                console.error('Failed to update event');
                return;
            }

            queryClient.invalidateQueries({ queryKey: ['coachEvents'] });
        } catch (error) {
            info.revert();
            console.error('Error updating event:', error);
        }
    }, [queryClient]);

    const handleSettings = useCallback(() => {
        // TODO: Ouvrir les paramètres de l'agenda
        console.log('Settings clicked');
    }, []);

    const getInitialTitle = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('fr-FR', options).format(now);
    };

    const displayTitle = currentTitle || getInitialTitle();
    const formattedTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-blue" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-red-500">Erreur lors du chargement des événements</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header avec breadcrumb et actions */}
            <div className="flex items-center justify-between gap-6">
                <Breadcrumbs
                    items={[
                        {
                            label: 'Agenda',
                            href: '/agenda',
                            icon: <Image src="/icons/Calendar.svg" alt="Calendar Icon" width={16} height={16} />,
                        },
                    ]}
                />

                <div className="flex items-center gap-4">
                    <SecondaryButton
                        onClick={handleSettings}
                        label={
                            <span className="flex items-center gap-2">
                                <Settings className="size-5" />
                                Paramètres
                            </span>
                        }
                    />
                    <PrimaryButton
                        onClick={handleAddEvent}
                        label="Ajouter un évènement"
                    />
                </div>
            </div>

            {/* Contenu du calendrier */}
            <div className="flex flex-col gap-4 flex-1">
                {/* Barre d'actions du calendrier */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary">
                        {formattedTitle}
                    </h2>

                    <AgendaActions
                        currentView={currentView}
                        onViewChange={handleViewChange}
                        onTodayClick={handleTodayClick}
                        onNavigatePrev={handleNavigatePrev}
                        onNavigateNext={handleNavigateNext}
                    />
                </div>

                {/* Calendrier FullCalendar */}
                <FullCalendarWrapper
                    calendarRef={calendarRef}
                    events={calendarEvents}
                    view={currentView}
                    onDatesChange={handleDatesChange}
                    onEventClick={handleEventClick}
                    onEventDoubleClick={handleEventDoubleClick}
                    onEventChange={handleEventChange}
                    className="flex-1"
                />
            </div>

            {/* Modal de création d'événement */}
            <EventModal
                open={isEventModalOpen}
                onOpenChange={handleEventModalClose}
                mode={eventModalMode}
                initialData={editEventData}
                selectedDate={selectedDateForEvent}
            />
        </div>
    );
}

export default AgendaClient;
