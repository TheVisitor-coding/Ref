'use client';

import { useRef, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import Breadcrumbs from '@/components/atoms/breadcrumb/breadcrumbs';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import FullCalendarWrapper, { CalendarView, CalendarEvent } from '@/components/molecules/calendar/FullCalendarWrapper';
import AgendaActions from '@/components/molecules/calendar/AgendaActions';
import EventModal from '@/components/molecules/modal/EventModal';
import { useCoachEvents } from '@/hooks/useCoachEvents';
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
    const [currentView, setCurrentView] = useState<CalendarView>('dayGridMonth');
    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const { calendarEvents, isLoading, isError } = useCoachEvents();

    // État de la modal d'événement
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | undefined>(undefined);

    const handleViewChange = useCallback((view: CalendarView) => {
        setCurrentView(view);
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView(view);
        }
        // Recalculer le titre selon la vue
        if (view === 'timeGridDay') {
            setCurrentTitle(formatDayDate(currentDate));
        } else if (view === 'timeGridWeek') {
            setCurrentTitle(formatWeekRange(currentDate));
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
            const formatter = new Intl.DateTimeFormat('fr-FR', options);
            setCurrentTitle(formatter.format(currentDate));
        }
    }, [currentDate]);

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

    const handleDateChange = useCallback((date: Date) => {
        setCurrentDate(date);
        // Mettre à jour le titre selon la vue
        if (currentView === 'timeGridDay') {
            setCurrentTitle(formatDayDate(date));
        } else if (currentView === 'timeGridWeek') {
            setCurrentTitle(formatWeekRange(date));
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
            const formatter = new Intl.DateTimeFormat('fr-FR', options);
            setCurrentTitle(formatter.format(date));
        }
    }, [currentView]);

    const handleEventClick = useCallback((event: CalendarEvent) => {
        // TODO: Ouvrir le détail de l'événement
        console.log('Event clicked:', event);
    }, []);

    const handleAddEvent = useCallback(() => {
        setSelectedDateForEvent(currentDate);
        setIsEventModalOpen(true);
    }, [currentDate]);

    const handleEventModalClose = useCallback((open: boolean) => {
        setIsEventModalOpen(open);
        if (!open) {
            setSelectedDateForEvent(undefined);
        }
    }, []);

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
                    onDateChange={handleDateChange}
                    onEventClick={handleEventClick}
                    className="flex-1"
                />
            </div>

            {/* Modal de création d'événement */}
            <EventModal
                open={isEventModalOpen}
                onOpenChange={handleEventModalClose}
                mode="create"
                selectedDate={selectedDateForEvent}
            />
        </div>
    );
}

export default AgendaClient;
