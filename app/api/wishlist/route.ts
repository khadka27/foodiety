import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            image: true,
            rating: true,
            difficulty: true,
            cookTime: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            image: true,
            rating: true,
            category: true,
            priceRange: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({
      success: true,
      data: wishlistItems,
    });
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { type, id } = await request.json();
    
    if (!type || !id || !['recipe', 'restaurant'].includes(type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid type or id' },
        { status: 400 }
      );
    }
    
    // Check if item exists
    if (type === 'recipe') {
      const recipe = await prisma.recipe.findUnique({ where: { id } });
      if (!recipe) {
        return NextResponse.json(
          { success: false, message: 'Recipe not found' },
          { status: 404 }
        );
      }
    } else {
      const restaurant = await prisma.restaurant.findUnique({ where: { id } });
      if (!restaurant) {
        return NextResponse.json(
          { success: false, message: 'Restaurant not found' },
          { status: 404 }
        );
      }
    }
    
    // Check if already in wishlist
    const existingItem = await prisma.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        ...(type === 'recipe' ? { recipeId: id } : { restaurantId: id }),
      },
    });
    
    if (existingItem) {
      return NextResponse.json(
        { success: false, message: 'Item already in wishlist' },
        { status: 400 }
      );
    }
    
    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: session.user.id,
        ...(type === 'recipe' ? { recipeId: id } : { restaurantId: id }),
      },
      include: {
        recipe: type === 'recipe' ? {
          select: {
            id: true,
            title: true,
            image: true,
          },
        } : undefined,
        restaurant: type === 'restaurant' ? {
          select: {
            id: true,
            name: true,
            image: true,
          },
        } : undefined,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Added to wishlist successfully',
      data: wishlistItem,
    });
  } catch (error) {
    console.error('Wishlist add error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}