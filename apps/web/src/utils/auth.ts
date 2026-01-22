import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        return payload as {
            id: number;
            role: 'coach' | 'athlete',
            permissions: string[]
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}