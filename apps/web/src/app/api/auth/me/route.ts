import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

interface StrapiUserResponse {
    id: number;
    documentId: string;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    phone: string | null;
    language: string;
    country: string;
    statusUser: string;
    lastPredashboardSeenAt: string | null;
}

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const jwtPayload = await verifyToken(token);
        if (!jwtPayload) {
            cookieStore.delete('auth-token');
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const strapiResponse = await fetch(
            `${process.env.STRAPI_INTERNAL_URL}/api/users/me`,
            {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store',
            }
        );

        if (!strapiResponse.ok) {
            if (strapiResponse.status === 401 || strapiResponse.status === 403) {
                cookieStore.delete('auth-token');
            }
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const user = (await strapiResponse.json()) as StrapiUserResponse;

        return NextResponse.json(
            {
                authenticated: true,
                user: {
                    id: user.id,
                    documentId: user.documentId,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    company_name: user.company_name,
                    phone: user.phone,
                    language: user.language,
                    country: user.country,
                    statusUser: user.statusUser,
                    lastPredashboardSeenAt: user.lastPredashboardSeenAt,
                    role: jwtPayload.role,
                },
            },
            { status: 200, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
        );
    } catch (error) {
        console.error('Auth me error:', error);
        return NextResponse.json(
            {
                authenticated: false,
                user: null,
                error: 'An unexpected error occurred',
            },
            { status: 200 }
        );
    }
}
