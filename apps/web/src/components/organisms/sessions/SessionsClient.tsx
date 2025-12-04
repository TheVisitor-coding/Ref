'use client'

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import CalendarActions from "@/components/molecules/calendar/CalendarActions";
import WeekCalendar, { DayData } from "@/components/molecules/calendar/WeekCalendar";
import SessionContent from "./SessionContent";
import { useGradientAnimation } from "@/hooks/animations/useGradientAnimation";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SessionModal from "@/components/molecules/modal/SessionModal";
import { Athlete } from "@/types/User";
import Image from "next/image";
import { getWeekStart } from "@/utils/date";
import { getSessionForDate } from "@/utils/session";
import { Session, SessionDisplay } from "@/types/Session";
import { useApi } from "@/hooks/useApi";
import { sportConfig, normalizeSportType } from "@/data/sports/sportsList";

interface SessionsClientProps {
    athleteId: number;
    athlete: Athlete;
}

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function generateWeekDaysWithSessions(
    weekStart: Date,
    selectedDate: Date,
    sessions: Session[]
): DayData[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return DAY_NAMES.map((dayName, i) => {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + i);
        currentDate.setHours(0, 0, 0, 0);

        const dayNumber = currentDate.getDate();
        const isToday = currentDate.getTime() === today.getTime();
        const isPast = currentDate < today;
        const isSelected = currentDate.getTime() === new Date(selectedDate.setHours(0, 0, 0, 0)).getTime();

        const sessionForDay = getSessionForDate(sessions, currentDate);
        const sessionTag = sessionForDay ? {
            label: sessionForDay.title,
            sportType: sessionForDay.sportType,
        } : undefined;

        return {
            dayName,
            dayNumber,
            date: currentDate,
            isSelected,
            isPast,
            isToday,
            sessionTag,
        };
    });
}

function SessionsClient({ athleteId, athlete }: SessionsClientProps) {
    const router = useRouter();
    const { backgroundRef, backgroundAccentRef } = useGradientAnimation();

    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [selectedSession, setSelectedSession] = useState<SessionDisplay | null>(null);

    const { data, isLoading } = useApi<{ data: Session[] }>(
        ["athleteSessions", athleteId],
        `/api/athletes/${athleteId}/sessions`,
        { credentials: "include" },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            staleTime: 30_000, // 30 secondes
        }
    );

    const sessions = data?.data ?? [];

    const athleteName = `${athlete.first_name || ''} ${athlete.last_name || ''}`.trim() || 'Athlète';
    const avatarUrl = athlete.avatar?.url
        ? `${STRAPI_BASE_URL}${athlete.avatar.url}`
        : "/icons/Account.svg";

    const currentSession = useMemo(() =>
        getSessionForDate(sessions, selectedDate),
        [sessions, selectedDate]
    );

    const weekDays = useMemo(() =>
        generateWeekDaysWithSessions(currentWeekStart, selectedDate, sessions),
        [currentWeekStart, selectedDate, sessions]
    );

    const gradientSport = currentSession?.sportType ?? 'running';
    const gradientConfig = sportConfig[gradientSport];

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

    const openModal = (mode: 'create' | 'edit' | 'view', session?: SessionDisplay | null) => {
        setModalMode(mode);
        setSelectedSession(session ?? null);
        setIsModalOpen(true);
    };

    const handleEdit = () => {
        if (currentSession) {
            openModal('edit', currentSession);
        }
    };

    const handleAdd = () => openModal('create');

    const handleDelete = () => {
        // TODO: Implement delete with confirmation dialog
        console.log('Delete session:', currentSession?.id);
    };

    return (
        <div className="h-full relative overflow-hidden">
            <div className="flex flex-col gap-6 p-6">
                <Breadcrumbs
                    items={[
                        {
                            label: "Sportifs",
                            href: "/athletes",
                            icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} />,
                        },
                        {
                            label: athleteName,
                            href: `/athletes/${athlete.id}`,
                            icon: (
                                <Image
                                    src={avatarUrl}
                                    alt="Athlete Avatar"
                                    width={16}
                                    height={16}
                                    className="rounded-sm object-cover mr-1"
                                />
                            ),
                        },
                    ]}
                />

                <div className="flex items-center justify-between gap-6 max-lg:flex-col max-lg:items-start w-full">
                    <SecondaryButton
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                        label={<><ChevronLeft className="size-5" /> Retour</>}
                    />

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
                    session={currentSession}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            </div>

            <SessionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                mode={modalMode}
                athleteId={athleteId}
                athleteName={athleteName}
                selectedDate={selectedDate}
                initialData={selectedSession ? {
                    title: selectedSession.title,
                    sport: selectedSession.sportType,
                    date: selectedSession.date.toISOString().split('T')[0],
                    rpe: selectedSession.rpe ?? undefined,
                    distance: selectedSession.distance?.toString() ?? '',
                    heartRate: selectedSession.heartRate?.toString() ?? '',
                    duration: selectedSession.duration?.toString() ?? '',
                    comment: selectedSession.comment ?? '',
                } : undefined}
            />

            {currentSession && (
                <div className="absolute right-0 w-full h-[577px] -bottom-[190px] pointer-events-none">
                    <div
                        ref={backgroundAccentRef}
                        className={`absolute top-1/6 w-full h-2/5 rounded-[50%] opacity-75 blur-[250px] ${gradientSport === 'running' ? 'bg-sport-running-light' :
                            gradientSport === 'cycling' ? 'bg-sport-cycling-light' :
                                'bg-sport-swimming-light'
                            }`}
                    />
                    <div
                        ref={backgroundRef}
                        className={`absolute top-5/12 w-full h-3/5 rounded-[50%] opacity-75 blur-[150px] ${gradientSport === 'running' ? 'bg-sport-running-dark' :
                            gradientSport === 'cycling' ? 'bg-sport-cycling-dark' :
                                'bg-sport-swimming-dark'
                            }`}
                    />
                </div>
            )}
        </div>
    );
}

export default SessionsClient;