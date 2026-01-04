'use server';

import { getTokenFromCookie } from '@/actions/auth-actions';
import { CoachEvent } from '@/types/CoachEvent';
import { EventPayload } from '@/schema/EventSchema';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchCoachEvents(): Promise<CoachEvent[]> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/coach-events?populate=*`, {
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

    const response = await fetch(`${STRAPI_URL}/api/coach-events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payload }),
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
