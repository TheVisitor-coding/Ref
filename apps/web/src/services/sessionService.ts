'use server';

import { getTokenFromCookie } from "@/actions/auth-actions";
import { SessionPayload } from "@/schema/SessionSchema";
import { Session } from "@/types/Session";
import { getMeId } from "./userService";

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

export async function fetchSessionById(sessionId: number): Promise<Session | null> {
    const token = await getTokenFromCookie();
    if (!token) return null;

    const res = await fetch(`${STRAPI}/api/sessions/${sessionId}?populate=*`, {
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