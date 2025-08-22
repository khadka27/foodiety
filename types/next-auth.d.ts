// types/next-auth.d.ts
import NextAuth from "next-auth";

type RoleType = "ADMIN" | "USER";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      name?: string | null;
      role: RoleType;
      avatar?: string | null;
      isEmailVerified: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    name?: string | null;
    role: RoleType;
    avatar?: string | null;
    isEmailVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    username: string;
    avatar?: string | null;
    isEmailVerified: boolean;
  }
}
