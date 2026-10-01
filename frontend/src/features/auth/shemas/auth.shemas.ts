import { z } from "zod";

export const nameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters long" })
  .max(20, { message: "Name must be at most 20 characters long" });

export const emailSchema = z.email({
  message: "Email is invalid",
});

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(50, { message: "Password must be at most 50 characters long" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
