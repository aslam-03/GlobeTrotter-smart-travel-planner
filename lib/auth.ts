import { compare, hash } from 'bcryptjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
    return await hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
}

export async function createSession(userId: string) {
    // Simple session cookie for hackathon
    // In production, use a signed JWT or database session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    cookies().set('session', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    cookies().delete('session');
}

export async function getSession() {
    const cookieStore = cookies();
    const session = cookieStore.get('session');
    return session?.value;
}

export async function getCurrentUser() {
    const userId = await getSession();

    if (!userId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        return user;
    } catch (error) {
        return null;
    }
}
