import { NextRequest, NextResponse } from 'next/server';
import { resendConfirmationSchema } from '@/schema/AuthSchema';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const validated = resendConfirmationSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json(
                {
                    error: 'Email invalide',
                    details: validated.error.issues,
                },
                { status: 400 }
            );
        }

        // Call Strapi endpoint
        const response = await fetch(
            `${STRAPI_URL}/api/auth/resend-confirmation`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: validated.data.email }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: data.error?.message || 'Erreur lors du renvoi de l\'email de confirmation',
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: data.message || 'Email de confirmation renvoyé',
        });
    } catch (error) {
        console.error('Resend confirmation error:', error);
        return NextResponse.json(
            {
                error: 'Une erreur est survenue lors du renvoi de l\'email',
            },
            { status: 500 }
        );
    }
}
