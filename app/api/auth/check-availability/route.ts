import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { type, value } = await request.json();
    
    if (!type || !value) {
      return NextResponse.json(
        { success: false, message: 'Type and value are required' },
        { status: 400 }
      );
    }
    
    let isAvailable = false;
    
    if (type === 'email') {
      const existingUser = await prisma.user.findUnique({
        where: { email: value },
      });
      isAvailable = !existingUser;
    } else if (type === 'username') {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });
      isAvailable = !existingUser;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid type' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      available: isAvailable,
      message: isAvailable 
        ? `${type} is available` 
        : `${type} is already taken`,
    });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while checking availability' },
      { status: 500 }
    );
  }
}