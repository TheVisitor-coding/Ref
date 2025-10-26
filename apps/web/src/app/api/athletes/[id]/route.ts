import { fetchCoachAthleteById } from '@/services/athleteService';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const idNum = Number(id);
    console.log(id, 'id param');

    if (!Number.isFinite(idNum)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        const athlete = await fetchCoachAthleteById(idNum);
        if (!athlete) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json({ data: athlete }, {
            status: 200,
            headers: { 'Cache-Control': 'no-store' },
        });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed' }, { status: 500 });
    }
}
