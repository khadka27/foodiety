import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { passwordResetSchema } from '@/lib/validations/auth';
import { withErrorHandling, withRateLimit } from '@/lib/middleware';
import crypto from 'crypto';

async function forgotPasswordHandler(request: NextRequest) {
  const body = await request.json();
  
  // Validate input
  const validatedData = passwordResetSchema.parse(body);
  
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });
  
  if (!user) {
    // Don't reveal if user exists or not for security
    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, we have sent a password reset link.',
    });
  }
  
  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
  
  // Save reset token
  await prisma.passwordReset.create({
    data: {
      email: validatedData.email,
      token: resetToken,
      expiresAt,
    },
  });
  
  // Log password reset request
  await prisma.auditLog.create({
    data: {
      action: 'PASSWORD_RESET_REQUEST',
      resource: 'AUTH',
      userId: user.id,
      details: {
        email: user.email,
        timestamp: new Date().toISOString(),
      },
    },
  });
  
  // In a real application, you would send an email here
  console.log(`Password reset token for ${validatedData.email}: ${resetToken}`);
  
  return NextResponse.json({
    success: true,
    message: 'If an account with that email exists, we have sent a password reset link.',
  });
}

export const POST = withRateLimit(withErrorHandling(forgotPasswordHandler), 3, 15 * 60 * 1000);