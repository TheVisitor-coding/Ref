import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_COOKIE_MAX_AGE = 60 * 60;

export async function GET() {
    const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');

    const cookieStore = await cookies();

    cookieStore.set(CSRF_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: CSRF_COOKIE_MAX_AGE,
        path: '/',
    });

    return NextResponse.json({ csrfToken: token });
}
