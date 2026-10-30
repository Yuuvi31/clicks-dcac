import { SignJWT, jwtVerify } from 'jose';
import { AuthSession, CouncilRole } from '@/types/backend';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'clicks-dcac-photography-society-secret-salt-2026'
);

export const COOKIE_NAME = 'clicks_council_session';

/**
 * Simple, zero-dependency SHA-256 password hash with salt
 */
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = 'clicks-salt-key-9988';
  const data = enc.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === expectedHash;
}

/**
 * Create a signed JWT session token (valid for 7 days)
 */
export async function createSessionToken(session: AuthSession): Promise<string> {
  return await new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verify and unpack a JWT session token
 */
export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as CouncilRole,
    };
  } catch {
    return null;
  }
}
