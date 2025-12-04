import { SessionFormSchema, transformFormToPayload } from "@/schema/SessionSchema";
import { addSessionForAthlete, fetchSessionsForAthlete } from "@/services/sessionService";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const athleteId = Number(id);

    if (!Number.isFinite(athleteId)) {
        return NextResponse.json({ error: 'Invalid athlete id' }, { status: 400 });
    }

    try {
        const body = await request.json();

        const parsedForm = SessionFormSchema.safeParse(body);

        if (!parsedForm.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: z.treeifyError(parsedForm.error) },
                { status: 422 }
            );
        }

        const payload = transformFormToPayload(parsedForm.data);

        const session = await addSessionForAthlete(athleteId, payload);

        return NextResponse.json({ data: session }, { status: 201 });
    } catch (e: unknown) {
        console.error('Error creating session:', e);
        const msg = e instanceof Error ? e.message : 'Failed to create session';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const athleteId = Number(id);

    if (!Number.isFinite(athleteId)) {
        return NextResponse.json({ error: 'Invalid athlete id' }, { status: 400 });
    }

    try {
        const sessions = await fetchSessionsForAthlete(athleteId);
        return NextResponse.json({ data: sessions }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to fetch sessions';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}