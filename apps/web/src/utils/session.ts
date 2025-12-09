import { Session, SessionDisplay } from '@/types/Session';
import { normalizeSportType } from '@/data/sports/sportsList';

export function toSessionDisplay(session: Session): SessionDisplay {
    return {
        id: session.id,
        documentId: session.documentId,
        date: new Date(session.start_datetime),
        title: session.name,
        sportType: normalizeSportType(session.sport),
        duration: session.expected_duration_minutes ?? session.actual_duration_minutes,
        distance: session.distance_km,
        heartRate: session.heart_rate_avg,
        comment: session.coach_comment,
        status: session.status,
        rpe: session.rpe,
    };
}

export function getSessionsForDate(sessions: Session[], date: Date): SessionDisplay[] {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return sessions
        .filter(session => {
            const sessionDate = new Date(session.start_datetime);
            sessionDate.setHours(0, 0, 0, 0);
            return sessionDate.getTime() === targetDate.getTime();
        })
        .map(toSessionDisplay);
}

export function getSessionForDate(sessions: Session[], date: Date): SessionDisplay | null {
    const sessionsForDate = getSessionsForDate(sessions, date);
    return sessionsForDate.length > 0 ? sessionsForDate[0] : null;
}

export function hasSessionOnDate(sessions: Session[], date: Date): boolean {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return sessions.some(session => {
        const sessionDate = new Date(session.start_datetime);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === targetDate.getTime();
    });
}

export function getSessionsForWeek(sessions: Session[], weekStart: Date): SessionDisplay[] {
    const start = new Date(weekStart);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return sessions
        .filter(session => {
            const sessionDate = new Date(session.start_datetime);
            return sessionDate >= start && sessionDate < end;
        })
        .map(toSessionDisplay);
}
