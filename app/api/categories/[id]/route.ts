import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to slugify a string
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await req.json();
    const { name, type } = body;

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (name) {
      updateData.name = name.trim();
      updateData.slug = slugify(name);
      
      // Verify slug uniqueness if changed
      if (updateData.slug !== existing.slug) {
        const slugExists = await prisma.category.findUnique({
          where: { slug: updateData.slug },
        });
        if (slugExists) {
          return NextResponse.json(
            { success: false, error: "Category name already exists" },
            { status: 400 }
          );
        }
      }
    }

    if (type) {
      const formattedType = type.toUpperCase();
      const validTypes = ["RECIPE", "RESTAURANT", "GALLERY", "SERVICE"];
      if (!validTypes.includes(formattedType)) {
        return NextResponse.json(
          { success: false, error: "Invalid type" },
          { status: 400 }
        );
      }
      updateData.type = formattedType;
    }

    const updated = await prisma.category.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("PUT /api/categories/[id] error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (err: any) {
    console.error("DELETE /api/categories/[id] error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
