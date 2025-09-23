import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (token) {

    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });
    
    return NextResponse.json({ message: true });
  }
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}