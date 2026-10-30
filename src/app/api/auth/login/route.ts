import { NextResponse } from 'next/server';
import { getCouncilUserByEmail } from '@/lib/db';
import { verifyPassword, createSessionToken, COOKIE_NAME } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/types/backend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Accept 'username' OR 'email' field (frontend sends as 'email' key)
    const body = await request.json();
    const username = (body.email || body.username || '').trim().toLowerCase();
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const user = await getCouncilUserByEmail(username);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. Check your username.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password. Contact President to reset.' },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: ROLE_PERMISSIONS[user.role],
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication service unavailable.' },
      { status: 500 }
    );
  }
}
