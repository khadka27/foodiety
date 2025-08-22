import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

type RoleType = "ADMIN" | "USER";

const Role = {
  ADMIN: "ADMIN" as const,
  USER: "USER" as const,
};
import bcrypt from "bcryptjs";
import { createUserSchema } from "@/lib/validations/user";

async function getUsersHandler(request: NextRequest) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") as RoleType | null;
  const isActive = searchParams.get("isActive");

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (isActive !== null) {
    where.isActive = isActive === "true";
  }

  // Get users with pagination
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
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
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
}

async function createUserHandler(request: NextRequest) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const body = await request.json();

  // Validate input
  const validatedData = createUserSchema.parse(body);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "User already exists with this email" },
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(validatedData.password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      username: validatedData.email.split("@")[0], // Use email prefix as username
      firstName: validatedData.name, // Map name to firstName for now
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role,
    },
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
    message: "User created successfully",
    data: user,
  });
}

export const GET = withErrorHandling(getUsersHandler);
export const POST = withErrorHandling(createUserHandler);
