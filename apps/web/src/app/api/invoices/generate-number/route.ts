import { NextResponse } from 'next/server';
import { generateInvoiceNumber } from '@/services/invoiceService';

export async function GET() {
    try {
        const invoiceNumber = await generateInvoiceNumber();
        return NextResponse.json({ data: invoiceNumber }, { status: 200 });
    } catch (e: unknown) {
        console.error('Error generating invoice number:', e);
        const msg = e instanceof Error ? e.message : 'Failed to generate invoice number';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
