"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import axios from "axios";
import {
  checkPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
  PasswordStrength,
} from "@/lib/utils/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Loader2,
  ChefHat,
  CheckCircle,
  Check,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [] as string[],
    isValid: false,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const watchedEmail = watch("email");
  const watchedUsername = watch("username");
  const watchedPassword = watch("password");

  // Check email availability
  useEffect(() => {
    const checkEmailAvailability = async () => {
      if (!watchedEmail || watchedEmail.length < 5) {
        setEmailAvailable(null);
        return;
      }

      setIsCheckingEmail(true);
      try {
        const response = await axios.post("/api/auth/check-availability", {
          type: "email",
          value: watchedEmail,
        });
        setEmailAvailable(response.data.available);
      } catch (error) {
        setEmailAvailable(null);
      } finally {
        setIsCheckingEmail(false);
      }
    };

    const debounceTimer = setTimeout(checkEmailAvailability, 500);
    return () => clearTimeout(debounceTimer);
  }, [watchedEmail]);

  // Check username availability
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (!watchedUsername || watchedUsername.length < 3) {
        setUsernameAvailable(null);
        return;
      }

      setIsCheckingUsername(true);
      try {
        const response = await axios.post("/api/auth/check-availability", {
          type: "username",
          value: watchedUsername,
        });
        setUsernameAvailable(response.data.available);
      } catch (error) {
        setUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    const debounceTimer = setTimeout(checkUsernameAvailability, 500);
    return () => clearTimeout(debounceTimer);
  }, [watchedUsername]);

  // Check password strength
  useEffect(() => {
    if (watchedPassword) {
      const strength = checkPasswordStrength(watchedPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({
        score: 0,
        feedback: [] as string[],
        isValid: false,
      });
    }
  }, [watchedPassword]);

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/signup", data);
      setSuccess(true);
      toast.success(
        "Account created! Please check your email to verify your account."
      );
      setTimeout(() => {
        router.push("/auth/signin");
      }, 3000);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Created!
              </h2>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully! Please check your
                email to verify your account before signing in.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold">Foodiety</span>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join our community of food lovers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Username *
              </label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  {...register("username")}
                  className={`${errors.username ? "border-red-500" : ""} ${
                    usernameAvailable === true ? "border-green-500" : ""
                  } ${usernameAvailable === false ? "border-red-500" : ""}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCheckingUsername && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                  {!isCheckingUsername && usernameAvailable === true && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {!isCheckingUsername && usernameAvailable === false && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              {!errors.username && usernameAvailable === false && (
                <p className="text-sm text-red-500">
                  This username is already taken
                </p>
              )}
              {!errors.username && usernameAvailable === true && (
                <p className="text-sm text-green-500">Username is available</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className={`${errors.email ? "border-red-500" : ""} ${
                    emailAvailable === true ? "border-green-500" : ""
                  } ${emailAvailable === false ? "border-red-500" : ""}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCheckingEmail && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                  {!isCheckingEmail && emailAvailable === true && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {!isCheckingEmail && emailAvailable === false && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              {!errors.email && emailAvailable === false && (
                <p className="text-sm text-red-500">
                  An account with this email already exists
                </p>
              )}
              {!errors.email && emailAvailable === true && (
                <p className="text-sm text-green-500">Email is available</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password *
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              {watchedPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Password strength:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.score <= 1
                          ? "text-red-500"
                          : passwordStrength.score === 2
                          ? "text-orange-500"
                          : passwordStrength.score === 3
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {getPasswordStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  <Progress
                    value={(passwordStrength.score / 4) * 100}
                    className={`h-2 ${getPasswordStrengthColor(
                      passwordStrength.score
                    )}`}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className={
                    errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={
                isLoading ||
                emailAvailable === false ||
                usernameAvailable === false ||
                !passwordStrength.isValid
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-red-600 hover:text-red-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
