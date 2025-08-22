import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

type RoleType = "ADMIN" | "USER";

export async function withAuth(request: NextRequest, requiredRole?: RoleType) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (requiredRole && token.role !== requiredRole) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return null; // Continue with the request
}

export function withErrorHandling(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof Error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

export function withRateLimit(
  handler: Function,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return async (request: NextRequest, context?: any) => {
    const ip =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    for (const [key, value] of requests.entries()) {
      if (value.resetTime < windowStart) {
        requests.delete(key);
      }
    }

    const userRequests = requests.get(ip);

    if (!userRequests) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (userRequests.resetTime < now) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (userRequests.count >= maxRequests) {
      return NextResponse.json(
        { success: false, message: "Too many requests" },
        { status: 429 }
      );
    } else {
      userRequests.count++;
    }

    return handler(request, context);
  };
}
