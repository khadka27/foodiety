import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type RoleType = "ADMIN" | "USER";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Email/Username and password are required");
        }

        try {
          // Find user by email or username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            },
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          if (!user.isActive) {
            throw new Error("Account is deactivated");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });

          // Log login action
          await prisma.auditLog.create({
            data: {
              action: "LOGIN",
              resource: "USER",
              resourceId: user.id,
              userId: user.id,
              details: {
                email: user.email,
                username: user.username,
                timestamp: new Date().toISOString(),
              },
            },
          });

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.firstName
              ? `${user.firstName} ${user.lastName || ""}`.trim()
              : user.username,
            role: user.role,
            avatar: user.avatar,
            isEmailVerified: user.isEmailVerified,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.avatar = user.avatar;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as RoleType;
        session.user.username = token.username as string;
        session.user.avatar = token.avatar as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
