"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactNode, useState, useEffect } from "react";
import nextDynamic from "next/dynamic";

export const ClientNavigation = nextDynamic(
  () => import("./Navigation").then((mod) => mod.Navigation),
  { ssr: false }
);

export const ClientFooter = nextDynamic(
  () => import("./Footer").then((mod) => mod.Footer),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

