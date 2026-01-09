'use server'

import { cookies } from "next/headers";

/**
 * Server Action - Retrieve Token JWT from Cookie
 */
export async function getTokenFromCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth-token')?.value;
    return authCookie || null;
}

/**
 * Server Action - Confirm Email
 */
export async function confirmEmail(token: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-confirmation?confirmation=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Erreur lors de la confirmation de l\'email',
            };
        }

        return {
            success: true,
            user: data.user,
        };
    } catch (error) {
        console.error('Confirm email error:', error);
        return {
            success: false,
            error: 'Une erreur est survenue lors de la confirmation',
        };
    }
}

/**
 * Server Action - Resend Confirmation Email
 */
export async function resendConfirmationEmail(email: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-confirmation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Erreur lors du renvoi de l\'email',
            };
        }

        return {
            success: true,
            message: data.message,
        };
    } catch (error) {
        console.error('Resend confirmation error:', error);
        return {
            success: false,
            error: 'Une erreur est survenue lors du renvoi',
        };
    }
}
