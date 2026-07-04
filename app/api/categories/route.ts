import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to slugify a string
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const whereClause: any = {};
    if (type) {
      whereClause.type = type.toUpperCase();
    }

    const categories = await prisma.category.findMany({
      where: whereClause,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (err: any) {
    console.error("GET /api/categories error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to retrieve categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type } = body;

    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, type" },
        { status: 400 }
      );
    }

    const formattedType = type.toUpperCase();
    const validTypes = ["RECIPE", "RESTAURANT", "GALLERY", "SERVICE"];
    if (!validTypes.includes(formattedType)) {
      return NextResponse.json(
        { success: false, error: "Invalid type. Must be RECIPE, RESTAURANT, GALLERY, or SERVICE." },
        { status: 400 }
      );
    }

    let slug = slugify(name);
    if (!slug) {
      slug = `category-${Date.now()}`;
    }

    // Check if category with this slug already exists (or append unique timestamp if necessary)
    const existing = await prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      // If it's the same type, we can return it or block it. Let's return error that name is already taken.
      return NextResponse.json(
        { success: false, error: `Category with name or slug '${slug}' already exists.` },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug,
        type: formattedType,
      },
    });

    return NextResponse.json({ success: true, data: category });
  } catch (err: any) {
    console.error("POST /api/categories error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
