"use client";

import { useEffect, useState } from "react";

export function useSafeToast() {
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Dynamically import toast to avoid SSR issues
    if (typeof window !== "undefined") {
      import("react-hot-toast").then((module) => {
        setToast(module.toast);
      });
    }
  }, []);

  const safeToast = {
    success: (message: string) => {
      if (isMounted && typeof window !== "undefined" && toast) {
        toast.success(message);
      }
    },
    error: (message: string) => {
      if (isMounted && typeof window !== "undefined" && toast) {
        toast.error(message);
      }
    },
    loading: (message: string) => {
      if (isMounted && typeof window !== "undefined" && toast) {
        return toast.loading(message);
      }
      return null;
    },
    dismiss: (toastId?: string) => {
      if (isMounted && typeof window !== "undefined" && toast) {
        toast.dismiss(toastId);
      }
    },
  };

  return safeToast;
}
