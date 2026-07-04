import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function getRestaurantsHandler(request: NextRequest) {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  return NextResponse.json({
    success: true,
    data: restaurants
  });
}

async function postRestaurantHandler(request: NextRequest) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

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

  const slug = `${slugify(name)}-${Date.now().toString().slice(-4)}`;

  const newRestaurant = await prisma.restaurant.create({
    data: {
      name,
      slug,
      description,
      address,
      city: city || "San Francisco",
      country: country || "USA",
      category: category || "ITALIAN",
      cuisine: cuisine || [],
      priceRange: priceRange || "$$",
      hours: hours || {},
      features: features || [],
      image: image || "",
      rating: 5.0,
      totalRatings: 1
    }
  });

  return NextResponse.json({
    success: true,
    data: newRestaurant
  });
}

export const GET = withErrorHandling(getRestaurantsHandler);
export const POST = withErrorHandling(postRestaurantHandler);
export const PUT = withErrorHandling(postRestaurantHandler);
