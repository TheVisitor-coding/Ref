import { NextRequest, NextResponse } from 'next/server';
import { emailConfirmationSchema } from '@/schema/AuthSchema';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const confirmation = searchParams.get('confirmation');

        // Validate input
        const validated = emailConfirmationSchema.safeParse({ confirmation });
        if (!validated.success) {
            return NextResponse.json(
                {
                    error: 'Token de confirmation invalide',
                    details: validated.error.issues,
                },
                { status: 400 }
            );
        }

        // Call Strapi endpoint
        const response = await fetch(
            `${STRAPI_URL}/api/auth/email-confirmation?confirmation=${confirmation}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: data.error?.message || 'Erreur lors de la confirmation de l\'email',
                },
                { status: response.status }
            );
        }

        // Store JWT in httpOnly cookie
        const res = NextResponse.json({
            success: true,
            user: data.user,
        });

        res.cookies.set('auth-token', data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return res;
    } catch (error) {
        console.error('Email confirmation error:', error);
        return NextResponse.json(
            {
                error: 'Une erreur est survenue lors de la confirmation de votre email',
            },
            { status: 500 }
        );
    }
}
