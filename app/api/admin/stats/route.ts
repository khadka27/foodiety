import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

const Role = {
  ADMIN: "ADMIN" as const,
  USER: "USER" as const,
};

async function getStatsHandler(request: NextRequest) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  // Get basic stats
  const [totalUsers, activeUsers, adminUsers, recentUsers, userGrowth] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
      // Get user registration trend for the last 12 months
      prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        COUNT(*)::int as count
      FROM users 
      WHERE "createdAt" >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `,
    ]);

  // Get recent activity (last 10 audit logs)
  const recentActivity = await prisma.auditLog.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      overview: {
        totalUsers,
        activeUsers,
        adminUsers,
        recentUsers,
      },
      userGrowth,
      recentActivity,
    },
  });
}

export const GET = withErrorHandling(getStatsHandler);
