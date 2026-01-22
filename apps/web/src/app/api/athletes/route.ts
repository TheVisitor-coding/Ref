import { fetchCoachAthletesServer } from '@/services/athleteService';
import { NextResponse } from 'next/server';

const toErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Failed';

export async function GET() {
    try {
        const data = await fetchCoachAthletesServer();
        return NextResponse.json({ data }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }
}
