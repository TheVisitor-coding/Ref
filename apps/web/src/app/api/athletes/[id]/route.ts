import { athleteUpdateSchema } from '@/schema/AthleteSchema';
import { fetchCoachAthleteById, updateAthleteById } from '@/services/athleteService';
import { NextResponse } from 'next/server';
import z from 'zod';

const toErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Failed';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const idNum = Number(id);

    if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

    try {
        const athlete = await fetchCoachAthleteById(idNum);
        if (!athlete) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ data: athlete }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error: unknown) {
        return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const idNum = Number(id);

    if (!Number.isFinite(idNum)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { relation_notes } = body;
        const parsed = athleteUpdateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: z.treeifyError(parsed.error) },
                { status: 422 }
            );
        }

        await updateAthleteById(idNum, {
            ...parsed.data,
            relation_notes: typeof relation_notes === 'string' ? relation_notes : undefined,
        });
        const getAthlete = await fetchCoachAthleteById(idNum);

        if (!getAthlete) {
            return NextResponse.json({ error: 'Not found after update' }, { status: 404 });
        }

        return NextResponse.json({ data: getAthlete }, { status: 200 });
    } catch (error: unknown) {
        const msg = toErrorMessage(error);
        const code = msg === 'Not authorized' ? 403 : 500;
        return NextResponse.json({ error: msg }, { status: code });
    }
}
