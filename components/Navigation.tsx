"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChefHat, Sparkles, LogOut, User, Heart, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blogs", href: "/blogs" },
  { name: "Recipes", href: "/recipes" },
  { name: "Restaurants", href: "/restaurants" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { data: session, status } = useSession();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navBg = scrolled || !isHomePage
    ? "glass-nav"
    : "bg-transparent backdrop-blur-sm";

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 transition-all duration-150 z-10"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className={`text-lg font-black tracking-tight transition-colors duration-300 ${
                  !scrolled && isHomePage ? "text-slate-900 dark:text-white" : "text-foreground"
                } group-hover:text-orange-500`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Foodiety
                </span>
                <span className={`text-[9px] font-semibold tracking-[0.15em] uppercase transition-colors ${
                  !scrolled && isHomePage ? "text-orange-600 dark:text-orange-300" : "text-orange-500"
                }`}>
                  Taste & Discover
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href)
                      ? !scrolled && isHomePage
                        ? "text-slate-900 dark:text-white bg-slate-900/5 dark:bg-white/15"
                        : "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30"
                      : !scrolled && isHomePage
                        ? "text-slate-800/80 hover:text-slate-900 hover:bg-slate-900/5 dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/20"
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />

              {status === "loading" ? (
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full animate-pulse" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative rounded-full ring-2 ring-orange-500/30 hover:ring-orange-500/60 transition-all duration-200"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user.avatar || undefined} alt={session.user.name || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold text-sm">
                          {session.user.name?.charAt(0)?.toUpperCase() ||
                            session.user.username?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 glass-panel border border-orange-200/30 dark:border-orange-800/20 rounded-2xl shadow-2xl p-1" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal px-3 py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.user.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold">
                            {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {session.user.name || session.user.username}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-900/30" />
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/30">
                      <Link href="/profile" className="flex items-center space-x-2 px-3 py-2">
                        <User className="h-4 w-4 text-orange-500" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/30">
                      <Link href="/wishlist" className="flex items-center space-x-2 px-3 py-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    {session.user.role === "ADMIN" && (
                      <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/30">
                        <Link href="/admin" className="flex items-center space-x-2 px-3 py-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-900/30" />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="rounded-xl cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={`rounded-full font-medium transition-all duration-200 ${
                      !scrolled && isHomePage
                      ? "text-slate-800 hover:text-slate-950 hover:bg-slate-900/5 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10"
                      : "text-foreground hover:text-orange-600"
                    }`}
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="btn-premium rounded-full px-5 py-2 text-sm shadow-lg shadow-orange-500/30"
                  >
                    <Link href="/auth/signup">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  !scrolled && isHomePage
                    ? "text-slate-900 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/10"
                    : "text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/30"
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden glass-panel border-t border-orange-200/20 dark:border-orange-900/20 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-orange-500/15 to-red-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/40 dark:border-orange-800/30"
                          : "text-foreground/80 hover:text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/25"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {isActive(item.href) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 ml-auto" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="border-t border-orange-100/40 dark:border-orange-900/30 pt-4 mt-4 space-y-2"
                >
                  {session ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-orange-50/50 dark:bg-orange-950/20">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={session.user.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-sm font-bold">
                            {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {session.user.name || session.user.username}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.user.email}</p>
                        </div>
                      </div>
                      {[
                        { href: "/profile", label: "Profile", icon: User },
                        { href: "/wishlist", label: "Wishlist", icon: Heart },
                      ].map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/25 transition-all"
                        >
                          <Icon className="h-4 w-4 text-orange-500" />
                          <span>{label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={() => { setIsOpen(false); signOut(); }}
                        className="flex items-center space-x-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/25 transition-all"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/auth/signin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-orange-200/50 dark:border-orange-800/30 text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/25 transition-all"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        Sign Up
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
