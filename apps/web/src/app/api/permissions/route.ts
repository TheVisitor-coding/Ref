import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({
        userId: payload.id,
        role: payload.role,
        permissions: payload.permissions
    })
}