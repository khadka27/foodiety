'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function AdminHeader() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <header className="bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border-b border-stone-200/40 dark:border-stone-800/40 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-extrabold font-outfit text-stone-900 dark:text-white ml-12 lg:ml-0 tracking-tight">
            Admin Portal
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-stone-200/60 dark:border-stone-800/60 shadow-sm hover:scale-105 active:scale-95 transition-all">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#c05c31]/10 text-[#c05c31] dark:bg-[#c05c31]/25 dark:text-[#ebc63c] font-bold">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-2 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/60 dark:border-stone-800/60 shadow-xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal px-2.5 py-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold text-stone-900 dark:text-white">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-stone-200/60 dark:bg-stone-800/60" />
              <DropdownMenuItem className="rounded-xl px-2.5 py-2 hover:bg-[#c05c31]/10 focus:bg-[#c05c31]/10 cursor-pointer">
                <User className="mr-2.5 h-4 w-4 text-stone-500" />
                <span className="font-semibold text-xs">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl px-2.5 py-2 hover:bg-[#c05c31]/10 focus:bg-[#c05c31]/10 cursor-pointer">
                <Settings className="mr-2.5 h-4 w-4 text-stone-500" />
                <span className="font-semibold text-xs">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-stone-200/60 dark:bg-stone-800/60" />
              <DropdownMenuItem onClick={handleSignOut} className="rounded-xl px-2.5 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                <LogOut className="mr-2.5 h-4 w-4" />
                <span className="font-bold text-xs">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}