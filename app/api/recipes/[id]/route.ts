import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

async function updateRecipeHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    difficulty,
    category,
    cuisine,
    tags,
    image,
    calories
  } = body;

  const recipe = await prisma.recipe.findUnique({
    where: { id }
  });

  if (!recipe) {
    return NextResponse.json(
      { success: false, message: "Recipe not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.recipe.update({
    where: { id },
    data: {
      title,
      description,
      ingredients: ingredients || [],
      instructions: instructions || [],
      prepTime: Number(prepTime) || 15,
      cookTime: Number(cookTime) || 15,
      servings: Number(servings) || 4,
      difficulty: difficulty || "Beginner",
      category: category || "MAIN_COURSE",
      cuisine: cuisine || "Global",
      tags: tags || [],
      image: image || "",
      nutritionInfo: calories ? { calories: Number(calories) } : {}
    }
  });

  return NextResponse.json({
    success: true,
    data: updated
  });
}

async function deleteRecipeHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id }
  });

  if (!recipe) {
    return NextResponse.json(
      { success: false, message: "Recipe not found" },
      { status: 404 }
    );
  }

  await prisma.recipe.delete({
    where: { id }
  });

  return NextResponse.json({
    success: true,
    message: "Recipe deleted successfully"
  });
}

export const PUT = withErrorHandling(updateRecipeHandler);
export const DELETE = withErrorHandling(deleteRecipeHandler);
