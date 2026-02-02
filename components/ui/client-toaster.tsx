"use client";

import { useEffect, useState } from "react";

export function ClientToaster() {
  const [isMounted, setIsMounted] = useState(false);
  const [ToasterComponent, setToasterComponent] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Dynamically import Toaster to avoid SSR issues
    if (typeof window !== "undefined") {
      import("react-hot-toast").then((module) => {
        setToasterComponent(() => module.Toaster);
      });
    }
  }, []);

  if (!isMounted || !ToasterComponent) {
    return null;
  }

  return (
    <ToasterComponent
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          style: {
            background: "#10b981",
          },
        },
        error: {
          style: {
            background: "#ef4444",
          },
        },
      }}
    />
  );
}
