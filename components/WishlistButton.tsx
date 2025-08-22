'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  type: 'recipe' | 'restaurant';
  id: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function WishlistButton({ 
  type, 
  id, 
  className, 
  size = 'md', 
  showText = false 
}: WishlistButtonProps) {
  const { data: session } = useSession();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  const inWishlist = isInWishlist(type, id);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.id) {
      toast.error('Please sign in to add items to your wishlist');
      return;
    }

    setIsLoading(true);
    await toggleWishlist(type, id);
    setIsLoading(false);
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <Button
      variant={inWishlist ? 'default' : 'outline'}
      size={showText ? 'sm' : 'icon'}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'transition-all duration-200',
        !showText && sizeClasses[size],
        inWishlist 
          ? 'bg-red-600 hover:bg-red-700 text-white border-red-600' 
          : 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300',
        className
      )}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          inWishlist && 'fill-current',
          showText && 'mr-2'
        )} 
      />
      {showText && (inWishlist ? 'Saved' : 'Save')}
    </Button>
  );
}