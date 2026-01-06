import { NextResponse } from 'next/server';
import { InvoiceFormSchema, transformInvoiceFormToPayload } from '@/schema/InvoiceSchema';
import { deleteInvoice, fetchInvoiceByDocumentId, updateInvoice } from '@/services/invoiceService';
import { fetchCoachAthleteById } from '@/services/athleteService';
import { getTokenFromCookie } from '@/actions/auth-actions';
import { getUserInfo } from '@/services/userService';

type RouteContext = {
    params: {
        documentId: string;
    };
};

function missingDocumentResponse() {
    return NextResponse.json({ error: 'Identifiant de facture manquant' }, { status: 400 });
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const documentId = context.params?.documentId;
        if (!documentId) {
            return missingDocumentResponse();
        }

        const existingInvoice = await fetchInvoiceByDocumentId(documentId);
        if (!existingInvoice) {
            return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 });
        }

        if (existingInvoice.statusInvoice && existingInvoice.statusInvoice !== 'draft') {
            return NextResponse.json(
                { error: 'Seules les factures brouillon peuvent être modifiées' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { isDraft, ...formData } = body;
        const parsedForm = InvoiceFormSchema.safeParse(formData);

        if (!parsedForm.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: parsedForm.error.flatten() },
                { status: 422 }
            );
        }

        const token = await getTokenFromCookie();
        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const coach = await getUserInfo(token);
        if (!coach) {
            return NextResponse.json({ error: 'Coach non authentifié' }, { status: 401 });
        }

        if (existingInvoice.coach?.id && existingInvoice.coach.id !== coach.id) {
            return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
        }

        const athlete = await fetchCoachAthleteById(parsedForm.data.athleteId);
        if (!athlete) {
            return NextResponse.json({ error: 'Athlète non trouvé' }, { status: 404 });
        }

        const athleteData = {
            name: `${athlete.first_name || ''} ${athlete.last_name || ''}`.trim() || athlete.username || 'Athlète',
            address: '',
            city: '',
            email: athlete.email || '',
        };

        const coachData = {
            name: `${coach.first_name || ''} ${coach.last_name || ''}`.trim() || coach.username || 'Coach',
            address: '',
            city: '',
            email: coach.email || '',
        };

        const payload = transformInvoiceFormToPayload(
            parsedForm.data,
            existingInvoice.invoice_number,
            athleteData,
            coachData,
            isDraft === true,
            coach.id
        );

        const updatedInvoice = await updateInvoice(documentId, payload);
        return NextResponse.json({ data: updatedInvoice }, { status: 200 });
    } catch (e: unknown) {
        console.error('Error updating invoice:', e);
        const msg = e instanceof Error ? e.message : 'Failed to update invoice';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function DELETE(_: Request, context: RouteContext) {
    try {
        const documentId = context.params?.documentId;
        if (!documentId) {
            return missingDocumentResponse();
        }

        const invoice = await fetchInvoiceByDocumentId(documentId);
        if (!invoice) {
            return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 });
        }

        if (invoice.statusInvoice && invoice.statusInvoice !== 'draft') {
            return NextResponse.json(
                { error: 'Seules les factures brouillon peuvent être supprimées' },
                { status: 403 }
            );
        }

        const token = await getTokenFromCookie();
        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const coach = await getUserInfo(token);
        if (!coach) {
            return NextResponse.json({ error: 'Coach non authentifié' }, { status: 401 });
        }

        if (invoice.coach?.id && invoice.coach.id !== coach.id) {
            return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
        }

        await deleteInvoice(documentId);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e: unknown) {
        console.error('Error deleting invoice:', e);
        const msg = e instanceof Error ? e.message : 'Failed to delete invoice';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
