import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

async function updateRestaurantHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  const {
    name,
    description,
    address,
    city,
    country,
    category,
    cuisine,
    priceRange,
    hours,
    features,
    image
  } = body;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id }
  });

  if (!restaurant) {
    return NextResponse.json(
      { success: false, message: "Restaurant not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.restaurant.update({
    where: { id },
    data: {
      name,
      description,
      address,
      city: city || restaurant.city,
      country: country || restaurant.country,
      category: category || restaurant.category,
      cuisine: cuisine || restaurant.cuisine,
      priceRange: priceRange || restaurant.priceRange,
      hours: hours || restaurant.hours,
      features: features || restaurant.features,
      image: image || restaurant.image
    }
  });

  return NextResponse.json({
    success: true,
    data: updated
  });
}

async function deleteRestaurantHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id }
  });

  if (!restaurant) {
    return NextResponse.json(
      { success: false, message: "Restaurant not found" },
      { status: 404 }
    );
  }

  await prisma.restaurant.delete({
    where: { id }
  });

  return NextResponse.json({
    success: true,
    message: "Restaurant deleted successfully"
  });
}

export const PUT = withErrorHandling(updateRestaurantHandler);
export const DELETE = withErrorHandling(deleteRestaurantHandler);
