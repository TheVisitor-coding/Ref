import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export async function verifyCsrfToken(request: Request): Promise<boolean> {
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!headerToken) {
        return false;
    }

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (!cookieToken) {
        return false;
    }

    return timingSafeEqual(headerToken, cookieToken);
}

function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
}

export async function invalidateCsrfToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(CSRF_COOKIE_NAME);
}
