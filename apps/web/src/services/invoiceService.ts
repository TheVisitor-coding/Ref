'use server';

import { getTokenFromCookie } from '@/actions/auth-actions';
import { AthleteInvoice } from '@/types/Invoice';
import { InvoicePayload } from '@/schema/InvoiceSchema';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchCoachInvoices(): Promise<AthleteInvoice[]> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const params = new URLSearchParams();
    params.set('populate[athlete][fields][0]', 'id');
    params.set('populate[athlete][fields][1]', 'username');
    params.set('populate[athlete][fields][2]', 'email');
    params.set('populate[athlete][fields][3]', 'first_name');
    params.set('populate[athlete][fields][4]', 'last_name');
    params.set('populate[coach][fields][0]', 'id');
    params.set('populate[coach][fields][1]', 'username');
    params.set('populate[coach][fields][2]', 'email');
    params.set('populate[coach][fields][3]', 'first_name');
    params.set('populate[coach][fields][4]', 'last_name');
    params.set('sort[0]', 'createdAt:desc');

    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la récupération des factures');
    }

    const result = await response.json();
    return result.data || [];
}

export async function fetchInvoiceByDocumentId(documentId: string): Promise<AthleteInvoice | null> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const params = new URLSearchParams();
    params.set('populate[athlete][fields][0]', 'id');
    params.set('populate[athlete][fields][1]', 'username');
    params.set('populate[athlete][fields][2]', 'email');
    params.set('populate[athlete][fields][3]', 'first_name');
    params.set('populate[athlete][fields][4]', 'last_name');
    params.set('populate[coach][fields][0]', 'id');
    params.set('populate[coach][fields][1]', 'username');
    params.set('populate[coach][fields][2]', 'email');
    params.set('populate[coach][fields][3]', 'first_name');
    params.set('populate[coach][fields][4]', 'last_name');

    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices/${documentId}?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la récupération de la facture');
    }

    const result = await response.json();
    return result.data;
}

export async function createInvoice(payload: InvoicePayload): Promise<AthleteInvoice> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices`, {
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
        throw new Error(errorData?.error?.message || 'Erreur lors de la création de la facture');
    }

    const result = await response.json();
    return result.data;
}

export async function updateInvoice(documentId: string, payload: Partial<InvoicePayload>): Promise<AthleteInvoice> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices/${documentId}`, {
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
        throw new Error(errorData?.error?.message || 'Erreur lors de la mise à jour de la facture');
    }

    const result = await response.json();
    return result.data;
}

export async function deleteInvoice(documentId: string): Promise<void> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices/${documentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la suppression de la facture');
    }
}

export async function generateInvoiceNumber(): Promise<string> {
    const token = await getTokenFromCookie();
    if (!token) throw new Error('Non authentifié');

    // Récupérer la dernière facture pour générer le numéro suivant
    const response = await fetch(`${STRAPI_URL}/api/athlete-invoices?sort=createdAt:desc&pagination[limit]=1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Erreur lors de la génération du numéro de facture');
    }

    const result = await response.json();
    const lastInvoice = result.data?.[0];

    if (!lastInvoice) {
        // Première facture
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        return `${year}${month}-001`;
    }

    // Extraire le numéro et l'incrémenter
    const lastNumber = lastInvoice.invoice_number;
    const match = lastNumber.match(/(\d+)-(\d+)$/);

    if (!match) {
        // Format non reconnu, générer un nouveau
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        return `${year}${month}-001`;
    }

    const [, period, num] = match;
    const nextNum = String(parseInt(num) + 1).padStart(3, '0');
    return `${period}-${nextNum}`;
}
