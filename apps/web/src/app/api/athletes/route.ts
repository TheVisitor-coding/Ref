import { fetchCoachAthletesServer } from '@/services/athleteService';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await fetchCoachAthletesServer();
        return NextResponse.json({ data }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed' }, { status: 500 });
    }
}
