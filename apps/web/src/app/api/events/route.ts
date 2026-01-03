import { EventFormSchema, transformEventFormToPayload } from "@/schema/EventSchema";
import { createCoachEvent, fetchCoachEvents, updateCoachEvent } from "@/services/eventService";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const parsedForm = EventFormSchema.safeParse(body);

        if (!parsedForm.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: z.treeifyError(parsedForm.error) },
                { status: 422 }
            );
        }

        const payload = transformEventFormToPayload(parsedForm.data);
        const event = await createCoachEvent(payload);

        return NextResponse.json({ data: event }, { status: 201 });
    } catch (e: unknown) {
        console.error('Error creating event:', e);
        const msg = e instanceof Error ? e.message : 'Failed to create event';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function GET() {
    try {
        const events = await fetchCoachEvents();
        return NextResponse.json(
            { data: events },
            { status: 200, headers: { 'Cache-Control': 'no-store' } }
        );
    } catch (e: unknown) {
        console.error('Error fetching events:', e);
        const msg = e instanceof Error ? e.message : 'Failed to fetch events';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        if (!body.documentId) {
            return NextResponse.json(
                { error: 'documentId is required for update' },
                { status: 400 }
            );
        }

        const parsedForm = EventFormSchema.safeParse(body);

        if (!parsedForm.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: z.treeifyError(parsedForm.error) },
                { status: 422 }
            );
        }

        const payload = transformEventFormToPayload(parsedForm.data);
        const event = await updateCoachEvent(body.documentId, payload);

        return NextResponse.json({ data: event }, { status: 200 });
    } catch (e: unknown) {
        console.error('Error updating event:', e);
        const msg = e instanceof Error ? e.message : 'Failed to update event';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
