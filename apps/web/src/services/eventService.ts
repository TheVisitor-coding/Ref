'use server';

import { getTokenFromCookie } from '@/actions/auth-actions';
import { CoachEvent } from '@/types/CoachEvent';
import { EventPayload } from '@/schema/EventSchema';
import { getMeId } from '@/services/userService';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchCoachEvents(): Promise<CoachEvent[]> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const coachId = await getMeId(token);

    const params = new URLSearchParams();
    params.set('populate[user][fields][0]', 'id');
    params.set('populate[user][fields][1]', 'username');
    params.set('populate[user][fields][2]', 'first_name');
    params.set('populate[user][fields][3]', 'last_name');
    params.set('populate[participants][fields][0]', 'id');
    params.set('populate[participants][fields][1]', 'username');
    params.set('populate[participants][fields][2]', 'first_name');
    params.set('populate[participants][fields][3]', 'last_name');
    params.set('sort[0]', 'date:desc');
    params.set('filters[user][id][$eq]', coachId.toString());

    const response = await fetch(`${STRAPI_URL}/api/coach-events?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la récupération des événements');
    }

    const result = await response.json();
    return result.data || [];
}

export async function createCoachEvent(payload: EventPayload): Promise<CoachEvent> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const coachId = await getMeId(token);

    const payloadWithUser = {
        ...payload,
        user: coachId,
    };

    const response = await fetch(`${STRAPI_URL}/api/coach-events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payloadWithUser }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Strapi error:', errorData);
        throw new Error(errorData?.error?.message || 'Erreur lors de la création de l\'événement');
    }

    const result = await response.json();
    return result.data;
}

export async function updateCoachEvent(documentId: string, payload: EventPayload): Promise<CoachEvent> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/coach-events/${documentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payload }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Strapi error:', errorData);
        throw new Error(errorData?.error?.message || 'Erreur lors de la mise à jour de l\'événement');
    }

    const result = await response.json();
    return result.data;
}

export async function deleteCoachEvent(documentId: string): Promise<void> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/coach-events/${documentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la suppression de l\'événement');
    }
}

export async function patchCoachEvent(documentId: string, partialData: Partial<EventPayload>): Promise<CoachEvent> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/coach-events/${documentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: partialData }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Strapi error:', errorData);
        throw new Error(errorData?.error?.message || 'Erreur lors de la mise à jour de l\'événement');
    }

    const result = await response.json();
    return result.data;
}

export async function fetchCoachEventById(documentId: string): Promise<CoachEvent> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/coach-events/${documentId}?populate=*`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Événement non trouvé');
    }

    const result = await response.json();
    return result.data;
}
