import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateWelcomeEmailHTML } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    // Find verification record
    const verification = await prisma.emailVerification.findUnique({
      where: { token },
    });
    
    if (!verification) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token' },
        { status: 400 }
      );
    }
    
    if (verification.used) {
      return NextResponse.json(
        { success: false, message: 'This verification link has already been used' },
        { status: 400 }
      );
    }
    
    if (verification.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Verification link has expired' },
        { status: 400 }
      );
    }
    
    // Find user and update verification status
    const user = await prisma.user.findUnique({
      where: { email: verification.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user and mark verification as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          emailVerificationToken: null,
        },
      }),
      prisma.emailVerification.update({
        where: { id: verification.id },
        data: { used: true },
      }),
    ]);
    
    // Send welcome email
    const welcomeHtml = generateWelcomeEmailHTML(user.username);
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Foodiety! 🎉',
      html: welcomeHtml,
    });
    
    // Log verification action
    await prisma.auditLog.create({
      data: {
        action: 'EMAIL_VERIFIED',
        resource: 'USER',
        resourceId: user.id,
        userId: user.id,
        details: {
          email: user.email,
          timestamp: new Date().toISOString(),
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! Welcome to Foodiety!',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during verification' },
      { status: 500 }
    );
  }
}