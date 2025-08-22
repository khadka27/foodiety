import { z } from "zod";

const Role = z.enum(["USER", "ADMIN"]);

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: Role,
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  role: Role.optional(),
  isActive: z.boolean().optional(),
});

export const bulkActionSchema = z.object({
  userIds: z.array(z.string()).min(1, "At least one user must be selected"),
  action: z.enum(["delete", "activate", "deactivate", "makeAdmin", "makeUser"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type BulkActionInput = z.infer<typeof bulkActionSchema>;
