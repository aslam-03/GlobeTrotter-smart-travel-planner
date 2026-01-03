import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Always return success to avoid leaking which emails exist
    return NextResponse.json({ success: true });
  }

  // Generate token and expiry
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Save token to user
  await prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExpiry },
  });

  // TODO: Send email with link containing token
  // For now, just log the link
  console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`);

  return NextResponse.json({ success: true });
}
