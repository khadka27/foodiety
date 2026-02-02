"use client";

import { ReactNode } from "react";

interface DynamicWrapperProps {
  children: ReactNode;
}

export function DynamicWrapper({ children }: DynamicWrapperProps) {
  return <>{children}</>;
}

// Force all pages to be dynamic
export const dynamic = "force-dynamic";
