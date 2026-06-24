"use client";

import { toast } from "react-hot-toast";

export function useSafeToast() {
  return {
    success: (message: string) => {
      if (typeof window !== "undefined") {
        toast.success(message);
      }
    },
    error: (message: string) => {
      if (typeof window !== "undefined") {
        toast.error(message);
      }
    },
    loading: (message: string) => {
      if (typeof window !== "undefined") {
        return toast.loading(message);
      }
      return null;
    },
    dismiss: (toastId?: string) => {
      if (typeof window !== "undefined") {
        toast.dismiss(toastId);
      }
    },
  };
}
