import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/types/backend';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token =
      cookieStore.get(COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
        permissions: ROLE_PERMISSIONS[session.role],
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
