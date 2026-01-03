import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

export async function POST() {
    await deleteSession();
    // Redirect to login after logout
    return NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
