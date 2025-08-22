import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { newPasswordSchema } from '@/lib/validations/auth';
import { withErrorHandling, withRateLimit } from '@/lib/middleware';

async function resetPasswordHandler(request: NextRequest) {
  const body = await request.json();
  const { token, ...passwordData } = body;
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Reset token is required' },
      { status: 400 }
    );
  }
  
  // Validate password input
  const validatedData = newPasswordSchema.parse(passwordData);
  
  // Find valid reset token
  const resetRequest = await prisma.passwordReset.findFirst({
    where: {
      token,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
  
  if (!resetRequest) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired reset token' },
      { status: 400 }
    );
  }
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: resetRequest.email },
  });
  
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(validatedData.password, 12);
  
  // Update user password and mark reset token as used
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    }),
    prisma.passwordReset.update({
      where: { id: resetRequest.id },
      data: { used: true },
    }),
  ]);
  
  // Log password reset
  await prisma.auditLog.create({
    data: {
      action: 'PASSWORD_RESET',
      resource: 'AUTH',
      userId: user.id,
      details: {
        email: user.email,
        timestamp: new Date().toISOString(),
      },
    },
  });
  
  return NextResponse.json({
    success: true,
    message: 'Password reset successfully',
  });
}

export const POST = withRateLimit(withErrorHandling(resetPasswordHandler), 5, 15 * 60 * 1000);