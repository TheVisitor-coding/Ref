'use server';

import { getTokenFromCookie } from "@/actions/auth-actions";
import { SessionPayload } from "@/schema/SessionSchema";
import { Session } from "@/types/Session";
import { getMeId } from "./userService";
import { diffChanges, pick } from "@/utils/diffChanges";
import { addLogAction } from "@/actions/log-actions";

const STRAPI = process.env.STRAPI_INTERNAL_URL;

export async function addSessionForAthlete(
    athleteId: number,
    payload: SessionPayload
): Promise<Session> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error("Unauthorized");

    const coachId = await getMeId(token);

    const strapiPayload = {
        data: {
            ...payload,
            coach: coachId,
            athlete: athleteId,
        }
    };

    const res = await fetch(`${STRAPI}/api/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(strapiPayload),
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        const message = err?.error?.message || `Strapi /sessions: ${res.status} ${res.statusText}`;
        throw new Error(message);
    }

    const result = await res.json();

    try {
        await addLogAction({
            userId: coachId,
            affectedUserId: athleteId,
            tableName: 'sessions',
            recordId: result.data.documentId,
            action: 'create',
            new_values: payload,
            authCookie: token,
        });
    } catch (e) {
        console.error('Error logging session creation:', e);
    }

    return result.data as Session;
}

export async function fetchSessionsForAthlete(athleteId: number): Promise<Session[]> {
    const token = await getTokenFromCookie();
    if (!token) return [];

    const coachId = await getMeId(token);

    const params = new URLSearchParams();
    params.set('filters[athlete][id][$eq]', String(athleteId));
    params.set('filters[coach][id][$eq]', String(coachId));
    params.set('sort', 'start_datetime:desc');
    params.set('pagination[pageSize]', '100');

    const res = await fetch(`${STRAPI}/api/sessions?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Strapi /sessions: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    return result.data as Session[];
}

export async function fetchSessionById(sessionId: string): Promise<Session | null> {
    const token = await getTokenFromCookie();
    if (!token) return null;

    const res = await fetch(`${STRAPI}/api/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Strapi /sessions/${sessionId}: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    return result.data as Session;
}

export async function updateSession(
    sessionDocumentId: string,
    payload: Partial<SessionPayload>
): Promise<Session> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error("Unauthorized");

    const strapiPayload = {
        data: payload
    };

    const userId = await getMeId(token);
    const sessionBeforeUpdate = await fetchSessionById(sessionDocumentId);
    console.log('Session before update:', sessionBeforeUpdate);

    const res = await fetch(`${STRAPI}/api/sessions/${sessionDocumentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(strapiPayload),
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        const message = err?.error?.message || `Strapi update session: ${res.status} ${res.statusText}`;
        throw new Error(message);
    }

    const result = await res.json();

    try {
        if (sessionBeforeUpdate) {
            const sessionKeys: ReadonlyArray<keyof Session> = [
                'id', 'documentId', 'coach', 'athlete', 'name', 'sport', 'tags',
                'description', 'objectives', 'session_body', 'coach_comment',
                'start_datetime', 'end_datetime', 'location', 'session_type',
                'requires_presence', 'status', 'intensity_level',
                'expected_duration_minutes', 'difficulty_level',
                'actual_duration_minutes', 'rpe', 'distance_km',
                'heart_rate_avg', 'speed_kmh', 'power_watts',
                'equipment_needed', 'preparation_notes', 'session_notes',
                'athlete_feedback', 'coach_rating'
            ];

            const previousValues = pick(sessionBeforeUpdate, sessionKeys);
            const updatedValues = pick(result.data as Session, sessionKeys);

            const { old_values: oldUserVals, new_values: newUserVals } =
                diffChanges(previousValues, updatedValues, sessionKeys);

            if (Object.keys(newUserVals).length > 0) {
                addLogAction({
                    userId,
                    affectedUserId: (result.data as Session).athlete as number,
                    tableName: 'sessions',
                    recordId: sessionDocumentId,
                    action: 'update',
                    old_values: oldUserVals,
                    new_values: newUserVals,
                    authCookie: token,
                });
            }
        }
    } catch (e) {
        console.error('Error logging session update:', e);
    }

    return result.data as Session;
}

export async function deleteSession(sessionDocumentId: string): Promise<void> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${STRAPI}/api/sessions/${sessionDocumentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        const message = err?.error?.message || `Strapi delete session: ${res.status} ${res.statusText}`;
        throw new Error(message);
    }
}