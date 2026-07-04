import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";
import { getToken } from "next-auth/jwt";

// Helper to slugify string
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

async function getRecipesHandler(request: NextRequest) {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      }
    }
  });

  return NextResponse.json({
    success: true,
    data: recipes
  });
}

async function postRecipeHandler(request: NextRequest) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const authorId = token?.sub;
  if (!authorId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Missing user token sub" },
      { status: 401 }
    );
  }

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

  const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;

  const newRecipe = await prisma.recipe.create({
    data: {
      title,
      slug,
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
      nutritionInfo: calories ? { calories: Number(calories) } : {},
      authorId,
      isPublished: true,
      rating: 5.0,
      totalRatings: 1
    }
  });

  return NextResponse.json({
    success: true,
    data: newRecipe
  });
}

export const GET = withErrorHandling(getRecipesHandler);
export const POST = withErrorHandling(postRecipeHandler);
