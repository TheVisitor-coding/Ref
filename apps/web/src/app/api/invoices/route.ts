import { NextResponse } from 'next/server';
import { InvoiceFormSchema, transformInvoiceFormToPayload } from '@/schema/InvoiceSchema';
import { createInvoice, fetchCoachInvoices, generateInvoiceNumber } from '@/services/invoiceService';
import { fetchCoachAthleteById } from '@/services/athleteService';
import { getUserInfo } from '@/services/userService';
import { getTokenFromCookie } from '@/actions/auth-actions';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const athleteIdParam = searchParams.get('athleteId');
        let athleteId: number | undefined;

        if (athleteIdParam !== null) {
            const parsed = Number(athleteIdParam);
            if (!Number.isFinite(parsed)) {
                return NextResponse.json({ error: 'Paramètre athleteId invalide' }, { status: 400 });
            }
            athleteId = parsed;
        }

        const invoices = await fetchCoachInvoices({ athleteId });
        return NextResponse.json({ data: invoices }, { status: 200 });
    } catch (e: unknown) {
        console.error('Error fetching invoices:', e);
        const msg = e instanceof Error ? e.message : 'Failed to fetch invoices';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { isDraft, ...formData } = body;

        const parsedForm = InvoiceFormSchema.safeParse(formData);

        if (!parsedForm.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: parsedForm.error.flatten() },
                { status: 422 }
            );
        }

        // Récupérer le token JWT
        const token = await getTokenFromCookie();
        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        // Récupérer les infos de l'athlète
        const athlete = await fetchCoachAthleteById(parsedForm.data.athleteId);
        if (!athlete) {
            return NextResponse.json(
                { error: 'Athlète non trouvé' },
                { status: 404 }
            );
        }

        // Récupérer les infos du coach
        const coach = await getUserInfo(token);
        if (!coach) {
            return NextResponse.json(
                { error: 'Coach non authentifié' },
                { status: 401 }
            );
        }

        // Générer le numéro de facture
        const invoiceNumber = await generateInvoiceNumber();

        // Transformer les données du formulaire
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
            invoiceNumber,
            athleteData,
            coachData,
            isDraft === true,
            coach.id
        );

        const invoice = await createInvoice(payload);

        return NextResponse.json({ data: invoice }, { status: 201 });
    } catch (e: unknown) {
        console.error('Error creating invoice:', e);
        const msg = e instanceof Error ? e.message : 'Failed to create invoice';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
