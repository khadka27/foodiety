import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface WishlistItem {
  id: string;
  recipeId?: string;
  restaurantId?: string;
  recipe?: {
    id: string;
    title: string;
    image?: string;
  };
  restaurant?: {
    id: string;
    name: string;
    image?: string;
  };
}

export function useWishlist() {
  const { data: session } = useSession();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchWishlist();
    }
  }, [session?.user?.id]);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/wishlist');
      setWishlistItems(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (type: 'recipe' | 'restaurant', id: string) => {
    if (!session?.user?.id) {
      toast.error('Please sign in to add items to your wishlist');
      return false;
    }

    try {
      await axios.post('/api/wishlist', {
        type,
        id,
      });

      toast.success(`Added to wishlist!`);
      fetchWishlist(); // Refresh wishlist
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (wishlistItemId: string) => {
    try {
      await axios.delete(`/api/wishlist/${wishlistItemId}`);
      toast.success('Removed from wishlist');
      fetchWishlist(); // Refresh wishlist
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
      return false;
    }
  };

  const isInWishlist = (type: 'recipe' | 'restaurant', id: string) => {
    return wishlistItems.some(item => 
      type === 'recipe' ? item.recipeId === id : item.restaurantId === id
    );
  };

  const toggleWishlist = async (type: 'recipe' | 'restaurant', id: string) => {
    const inWishlist = isInWishlist(type, id);
    
    if (inWishlist) {
      const item = wishlistItems.find(item => 
        type === 'recipe' ? item.recipeId === id : item.restaurantId === id
      );
      if (item) {
        return await removeFromWishlist(item.id);
      }
    } else {
      return await addToWishlist(type, id);
    }
    
    return false;
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refetch: fetchWishlist,
  };
}