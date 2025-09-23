import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token');
    const isAuthPage = req.nextUrl.pathname === '/sign-up';
    const isProtectedPage = !isAuthPage

    if (isProtectedPage) {
        if (!token) {
            return NextResponse.redirect(new URL('/sign-up', req.url));
        }
       
        const payload = await verifyToken(token.value) as {
            id: number;
            role: 'coach' | 'athlete',
            permissions: string[]
        };

        if (!payload) {
            const response = NextResponse.redirect(new URL('/sign-up', req.url))
            response.cookies.delete('auth-token')
            return response
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  }