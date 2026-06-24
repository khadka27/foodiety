"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

// Suppress React 19 warning for next-themes script tag to avoid Next.js dev overlay crash
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const errorMsg = typeof args[0] === "string" ? args[0] : "";
    if (
      errorMsg.includes("Encountered a script tag") ||
      errorMsg.includes("Scripts inside React components are never executed")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

