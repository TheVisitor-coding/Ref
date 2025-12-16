import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface StrapiErrorResponse {
    error?: {
        status?: number;
        name?: string;
        message?: string;
        details?: unknown;
    };
}

interface StrapiSuccessResponse {
    jwt: string;
    user: {
        id: number;
        documentId: string;
        username: string;
        email: string;
        [key: string]: unknown;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const strapiResponse = await fetch(
            `${process.env.STRAPI_INTERNAL_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                cache: 'no-store',
            }
        );

        const data = await strapiResponse.json();

        if (!strapiResponse.ok) {
            const errorData = data as StrapiErrorResponse;
            const isAuthError = strapiResponse.status === 400 || strapiResponse.status === 401;

            return NextResponse.json(
                {
                    error: {
                        status: strapiResponse.status,
                        name: errorData.error?.name || 'LoginError',
                        message: isAuthError ? 'Invalid email/username or password' : (errorData.error?.message || 'Login failed'),
                        details: isAuthError ? undefined : errorData.error?.details,
                    },
                },
                { status: strapiResponse.status }
            );
        }

        const successData = data as StrapiSuccessResponse;
        const cookieStore = await cookies();

        cookieStore.set('auth-token', successData.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return NextResponse.json({ user: successData.user, message: 'Login successful' }, { status: 200 });
    } catch (error) {
        console.error('Login proxy error:', error);
        return NextResponse.json(
            { error: { status: 500, name: 'InternalServerError', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}
