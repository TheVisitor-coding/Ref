import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token');
    const pathname = req.nextUrl.pathname;
    const isAuthPage = pathname.startsWith('/auth');
    const isProtectedPage = !isAuthPage;

    // Allow access to email confirmation pages even with token
    const isEmailConfirmationPage = pathname === '/auth/email-confirmation' || pathname === '/auth/check-email';

    if (isAuthPage && token && !isEmailConfirmationPage) {
        const payload = await verifyToken(token.value);
        if (payload) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        const response = NextResponse.next();
        response.cookies.delete('auth-token');
        return response;
    }

    if (isProtectedPage) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/sign-in', req.url));
        }

        const payload = await verifyToken(token.value) as {
            id: number;
            role: 'coach' | 'athlete',
            permissions: string[]
        };

        if (!payload) {
            const response = NextResponse.redirect(new URL('/auth/sign-in', req.url))
            response.cookies.delete('auth-token')
            return response
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'
    ]
};