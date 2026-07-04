"use client";

import { useState, useEffect } from "react";
import { ChefHat, Check, X, Loader2, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { checkPasswordStrength } from "@/lib/utils/password";
import { useSafeToast } from "@/hooks/use-safe-toast";

import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

// Simple signup form data interface
interface SignUpInput {
 username: string;
 email: string;
 password: string;
}

// Password strength interface
interface PasswordStrength {
 score: number;
 feedback: string[];
 isValid: boolean;
}

function SignUpPageComponent() {
 // Form state
 const [formData, setFormData] = useState<SignUpInput>({
 username: "",
 email: "",
 password: "",
 });

 // Error state for manual validation
 const [formErrors, setFormErrors] = useState<{
 username?: { message: string };
 email?: { message: string };
 password?: { message: string };
 }>({});

 // UI state
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
 const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
 null
 );
 const [isCheckingEmail, setIsCheckingEmail] = useState(false);
 const [isCheckingUsername, setIsCheckingUsername] = useState(false);
 const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
 score: 0,
 feedback: [],
 isValid: false,
 });

 const router = useRouter();
 const safeToast = useSafeToast();

 // Mount state
 const [isMounted, setIsMounted] = useState(false);

 // Set mounted state
 useEffect(() => {
 setIsMounted(true);
 }, []);

 // Handle form input changes
 const handleInputChange = (field: keyof SignUpInput, value: string) => {
 setFormData((prev) => ({ ...prev, [field]: value }));

 // Clear errors when user starts typing
 if (formErrors[field]) {
 setFormErrors((prev) => ({ ...prev, [field]: undefined }));
 }
 };

 // Simple validation function
 const validateForm = (): boolean => {
 const errors: typeof formErrors = {};

 // Username validation
 if (!formData.username) {
 errors.username = { message: "Username is required" };
 } else if (formData.username.length < 3) {
 errors.username = { message: "Username must be at least 3 characters" };
 } else if (formData.username.length > 20) {
 errors.username = { message: "Username must be less than 20 characters" };
 } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
 errors.username = {
 message: "Username can only contain letters, numbers, and underscores",
 };
 }

 // Email validation
 if (!formData.email) {
 errors.email = { message: "Email is required" };
 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
 errors.email = { message: "Please enter a valid email address" };
 }

 // Password validation
 if (!formData.password) {
 errors.password = { message: "Password is required" };
 } else if (formData.password.length < 8) {
 errors.password = { message: "Password must be at least 8 characters" };
 }

 setFormErrors(errors);
 return Object.keys(errors).length === 0;
 };

 // Check email availability
 useEffect(() => {
 const checkEmailAvailability = async () => {
 if (!formData.email || formData.email.length < 5) {
 setEmailAvailable(null);
 return;
 }

 setIsCheckingEmail(true);
 try {
 const response = await axios.post("/api/auth/check-availability", {
 type: "email",
 value: formData.email,
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
 }, [formData.email]);

 // Check username availability
 useEffect(() => {
 const checkUsernameAvailability = async () => {
 if (!formData.username || formData.username.length < 3) {
 setUsernameAvailable(null);
 return;
 }

 setIsCheckingUsername(true);
 try {
 const response = await axios.post("/api/auth/check-availability", {
 type: "username",
 value: formData.username,
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
 }, [formData.username]);

 // Check password strength
 useEffect(() => {
 if (formData.password) {
 const strength = checkPasswordStrength(formData.password);
 setPasswordStrength(strength);
 } else {
 setPasswordStrength({
 score: 0,
 feedback: [] as string[],
 isValid: false,
 });
 }
 }, [formData.password]);

 const onSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 if (!validateForm()) {
 return;
 }

 if (emailAvailable === false || usernameAvailable === false) {
 setError("Please fix the availability issues before submitting");
 return;
 }

 setIsLoading(true);
 setError("");

 try {
 const response = await axios.post("/api/auth/signup", formData);
 setSuccess(true);
 safeToast.success(
 "Account created! Please check your email to verify your account."
 );
 setTimeout(() => {
 router.push("/auth/signin");
 }, 3000);
 } catch (error: any) {
 const message =
 error.response?.data?.message || "An unexpected error occurred";
 setError(message);
 safeToast.error(message);
 } finally {
 setIsLoading(false);
 }
 };

 if (success) {
 return (
 <div className="min-h-screen flex items-center justify-center dark:/20 dark:/20 p-4">
 <Card className="w-full max-w-md">
 <CardContent className="pt-6">
 <div className="text-center">
 <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
 <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
 </div>
 <h2 className="text-xl font-semibold mb-2">Account Created!</h2>
 <p className="text-gray-600 dark:text-gray-400 mb-4">
 Please check your email to verify your account.
 </p>
 <div className="flex items-center justify-center text-sm text-gray-500">
 <Mail className="h-4 w-4 mr-2" />
 Redirecting to sign in...
 </div>
 </div>
 </CardContent>
 </Card>
 </div>
 );
 }

 if (!isMounted) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <Loader2 className="h-8 w-8 animate-spin" />
 </div>
 );
 }

 return (
 <div className="min-h-screen flex items-center justify-center dark:/20 dark:/20 p-4">
 <Card className="w-full max-w-md">
 <CardHeader className="space-y-1">
 <div className="flex items-center gap-2 mx-auto">
 <ChefHat className="h-8 w-8 text-red-600" />
 <span className="text-2xl font-bold">Foodiety</span>
 </div>
 <CardTitle className="text-2xl">Create your account</CardTitle>
 <CardDescription>Join our community of food lovers</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={onSubmit} className="space-y-4">
 {error && (
 <Alert variant="destructive">
 <AlertDescription>{error}</AlertDescription>
 </Alert>
 )}

 <div className="space-y-2">
 <label htmlFor="username" className="text-sm font-medium">
 Username *
 </label>
 <div className="relative">
 <Input
 id="username"
 type="text"
 placeholder="Choose a username"
 value={formData.username}
 onChange={(e) =>
 handleInputChange("username", e.target.value)
 }
 className={`${formErrors.username ? "border-red-500" : ""} ${
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
 {formErrors.username && (
 <p className="text-sm text-red-500">
 {formErrors.username.message}
 </p>
 )}
 {!formErrors.username && usernameAvailable === false && (
 <p className="text-sm text-red-500">
 This username is already taken
 </p>
 )}
 {!formErrors.username && usernameAvailable === true && (
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
 value={formData.email}
 onChange={(e) => handleInputChange("email", e.target.value)}
 className={`${formErrors.email ? "border-red-500" : ""} ${
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
 {formErrors.email && (
 <p className="text-sm text-red-500">
 {formErrors.email.message}
 </p>
 )}
 {!formErrors.email && emailAvailable === false && (
 <p className="text-sm text-red-500">
 This email is already registered
 </p>
 )}
 {!formErrors.email && emailAvailable === true && (
 <p className="text-sm text-green-500">Email is available</p>
 )}
 </div>

 <div className="space-y-2">
 <label htmlFor="password" className="text-sm font-medium">
 Password *
 </label>
 <div className="relative">
 <Input
 id="password"
 type={showPassword ? "text" : "password"}
 placeholder="Create a strong password"
 value={formData.password}
 onChange={(e) =>
 handleInputChange("password", e.target.value)
 }
 className={formErrors.password ? "border-red-500" : ""}
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 transform -translate-y-1/2"
 >
 {showPassword ? (
 <EyeOff className="h-4 w-4 text-gray-400" />
 ) : (
 <Eye className="h-4 w-4 text-gray-400" />
 )}
 </button>
 </div>
 {formErrors.password && (
 <p className="text-sm text-red-500">
 {formErrors.password.message}
 </p>
 )}

 {/* Password strength indicator */}
 {formData.password && (
 <div className="space-y-2">
 <div className="flex space-x-1">
 {[...Array(4)].map((_, i) => (
 <div
 key={i}
 className={`h-1 flex-1 rounded ${
 i < passwordStrength.score
 ? passwordStrength.score <= 1
 ? "bg-red-500"
 : passwordStrength.score <= 2
 ? "bg-yellow-500"
 : passwordStrength.score <= 3
 ? "bg-blue-500"
 : "bg-green-500"
 : "bg-gray-200 dark:bg-gray-700"
 }`}
 />
 ))}
 </div>
 <p
 className={`text-xs ${
 passwordStrength.score <= 1
 ? "text-red-500"
 : passwordStrength.score <= 2
 ? "text-yellow-500"
 : passwordStrength.score <= 3
 ? "text-blue-500"
 : "text-green-500"
 }`}
 >
 {passwordStrength.score <= 1
 ? "Weak"
 : passwordStrength.score <= 2
 ? "Fair"
 : passwordStrength.score <= 3
 ? "Good"
 : "Strong"}
 </p>
 {passwordStrength.feedback.length > 0 && (
 <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
 {passwordStrength.feedback.map((tip, index) => (
 <li key={index}>• {tip}</li>
 ))}
 </ul>
 )}
 </div>
 )}
 </div>

 <Button
 type="submit"
 className="w-full"
 disabled={
 isLoading ||
 emailAvailable === false ||
 usernameAvailable === false
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

 <div className="text-center text-sm">
 <span className="text-gray-600 dark:text-gray-400">
 Already have an account?{" "}
 </span>
 <Link
 href="/auth/signin"
 className="text-red-600 hover:text-red-500 font-medium"
 >
 Sign in
 </Link>
 </div>
 </form>
 </CardContent>
 </Card>
 </div>
 );
}

const SignUpPage = nextDynamic(
 () => Promise.resolve(SignUpPageComponent),
 { ssr: false }
);

export default SignUpPage;
