'use client'

import { useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import CalendarActions from "@/components/molecules/calendar/CalendarActions";
import WeekCalendar, { DayData } from "@/components/molecules/calendar/WeekCalendar";
import SessionContent, { SessionData } from "./SessionContent";
import SessionModal from "@/components/molecules/modal/sessionModal";
import { useGradientAnimation } from "@/hooks/animations/useGradientAnimation";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function SessionsClient({ athleteId }: { athleteId?: number }) {
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const { backgroundRef, backgroundAccentRef } = useGradientAnimation();

    const router = useRouter();

    const weekDays = generateWeekDays(currentWeekStart, selectedDate);

    const mockSession: SessionData = {
        id: 1,
        date: formatDate(selectedDate),
        title: "Fractionné court",
        sportType: "running",
        duration: 50,
        distance: 9,
        heartRate: 155,
        comment: "Après les 20min d'échauffement, à écouler sur les récup boisson iso + 37g dans une flasque + 1 gel à la 4eme série  ; total 63G, "
    };

    const handleNavigatePrev = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeekStart(newDate);
    };

    const handleNavigateNext = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeekStart(newDate);
    };

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentWeekStart(getWeekStart(today));
        setSelectedDate(today);
    };

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleEdit = () => {
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        console.log('Delete session');
    };

    const handleAdd = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleView = () => {
        setModalMode('view');
        setIsModalOpen(true);
    };

    return (
        <div className="h-full relative overflow-hidden">
            <div className="flex flex-col gap-6 p-6">
                <Breadcrumbs
                    items={[
                        {
                            label: "Sportifs",
                            href: "/athletes",
                        },
                    ]}
                />

                <div className="flex items-center justify-between gap-6 max-lg:flex-col max-lg:items-start w-full">
                    <SecondaryButton onClick={() => router.back()} className="flex items-center gap-2" label={<><ChevronLeft className="size-5" /> Retour</>} />

                    <CalendarActions
                        onTodayClick={handleTodayClick}
                        onNavigatePrev={handleNavigatePrev}
                        onNavigateNext={handleNavigateNext}
                    />
                </div>

                <WeekCalendar
                    days={weekDays}
                    onDayClick={handleDayClick}
                />


                <SessionContent
                    session={mockSession}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            </div>

            <SessionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                mode={modalMode}
            />

            {
                mockSession && (
                    <div
                        className="absolute right-0 w-full h-[577px] -bottom-[190px]"
                    >
                        <div
                            ref={backgroundAccentRef}
                            className="absolute top-1/6 w-full h-2/5 bg-sport-running-light rounded-[50%] opacity-75 blur-[250px]"
                        />

                        <div
                            ref={backgroundRef}
                            className="absolute top-5/12 w-full h-3/5 bg-sport-running-dark rounded-[50%] opacity-75 blur-[150px]"
                        />
                    </div>
                )
            }
        </div>
    );
}

function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function formatDate(date: Date): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];

    return `${dayName} ${dayNumber} ${monthName}`;
}

function generateWeekDays(weekStart: Date, selectedDate: Date): DayData[] {
    const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const days: DayData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mockSessions: Record<string, { label: string; sportType: 'running' | 'cycling' | 'swimming' }> = {
        '1': { label: 'Natation', sportType: 'swimming' },
        '3': { label: 'Course à pied', sportType: 'running' },
        '4': { label: 'Cyclisme', sportType: 'cycling' },
        '6': { label: 'Course à pied', sportType: 'running' },
        '7': { label: 'Cyclisme', sportType: 'cycling' },
    };

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + i);
        currentDate.setHours(0, 0, 0, 0);

        const dayNumber = currentDate.getDate();
        const isToday = currentDate.getTime() === today.getTime();
        const isPast = currentDate < today;
        const isSelected = currentDate.getTime() === selectedDate.getTime();

        days.push({
            dayName: dayNames[i],
            dayNumber,
            date: currentDate,
            isSelected,
            isPast,
            isToday,
            sessionTag: mockSessions[i.toString()]
        });
    }

    return days;
}

export default SessionsClient;