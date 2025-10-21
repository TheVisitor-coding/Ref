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
