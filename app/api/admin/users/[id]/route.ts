import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";
import { updateUserSchema } from "@/lib/validations/user";

const Role = {
  ADMIN: "ADMIN" as const,
  USER: "USER" as const,
};

async function getUserHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
}

async function updateUserHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  // Validate input
  const validatedData = updateUserSchema.parse(body);

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  // Check if email is already taken by another user
  if (validatedData.email && validatedData.email !== existingUser.email) {
    const emailTaken = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (emailTaken) {
      return NextResponse.json(
        { success: false, message: "Email is already taken" },
        { status: 400 }
      );
    }
  }

  // Update user
  const user = await prisma.user.update({
    where: { id: id },
    data: validatedData,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true,
    },
  });

  return NextResponse.json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
}

async function deleteUserHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const { id } = await params;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  // Delete user (cascade will handle audit logs)
  await prisma.user.delete({
    where: { id: id },
  });

  return NextResponse.json({
    success: true,
    message: "User deleted successfully",
  });
}

export const GET = withErrorHandling(getUserHandler);
export const PUT = withErrorHandling(updateUserHandler);
export const DELETE = withErrorHandling(deleteUserHandler);
