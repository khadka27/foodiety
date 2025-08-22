import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

const Role = {
  ADMIN: "ADMIN" as const,
  USER: "USER" as const,
};
import { bulkActionSchema } from "@/lib/validations/user";

async function bulkActionHandler(request: NextRequest) {
  // Check admin authorization
  const authError = await withAuth(request, Role.ADMIN);
  if (authError) return authError;

  const body = await request.json();

  // Validate input
  const validatedData = bulkActionSchema.parse(body);

  const { userIds, action } = validatedData;

  let result;
  let message = "";

  switch (action) {
    case "delete":
      result = await prisma.user.deleteMany({
        where: { id: { in: userIds } },
      });
      message = `${result.count} users deleted successfully`;
      break;

    case "activate":
      result = await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { isActive: true },
      });
      message = `${result.count} users activated successfully`;
      break;

    case "deactivate":
      result = await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { isActive: false },
      });
      message = `${result.count} users deactivated successfully`;
      break;

    case "makeAdmin":
      result = await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { role: Role.ADMIN },
      });
      message = `${result.count} users promoted to admin successfully`;
      break;

    case "makeUser":
      result = await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { role: Role.USER },
      });
      message = `${result.count} users demoted to user successfully`;
      break;

    default:
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
  }

  return NextResponse.json({
    success: true,
    message,
    data: { affected: result.count },
  });
}

export const POST = withErrorHandling(bulkActionHandler);
