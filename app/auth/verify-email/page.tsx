"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, ChefHat } from "lucide-react";
import Link from "next/link";
import { useSafeToast } from "@/hooks/use-safe-toast";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const safeToast = useSafeToast();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !token) {
      if (isMounted && !token) {
        setStatus("error");
        setMessage("Invalid verification link");
      }
      return;
    }

    verifyEmail();
  }, [token, isMounted]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/auth/verify-email", { token });
      setStatus("success");
      setMessage(response.data.message);
      safeToast.success("Email verified successfully!");

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin");
      }, 3000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Verification failed");
      safeToast.error("Email verification failed");
    }
  };

  // Prevent SSR context issues
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-red-600 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <ChefHat className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">Foodiety</span>
            </div>

            {status === "loading" && (
              <>
                <Loader2 className="h-16 w-16 text-red-600 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Email Verified Successfully!
                </h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Redirecting to sign in page in 3 seconds...
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/auth/signin">Continue to Sign In</Link>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Link href="/auth/signup">Create New Account</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/signin">Back to Sign In</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-red-600 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
