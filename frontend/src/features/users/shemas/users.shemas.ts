import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from "@/features/auth/shemas/auth.shemas";
import { z } from "zod";

export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
