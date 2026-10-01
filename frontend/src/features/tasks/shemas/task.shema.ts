import { z } from "zod";

export const taskSchema = z.object({
  categoryId: z.number().nullable(),
  title: z
    .string()
    .min(1, { message: "Le titre est obligatoire" })
    .max(120, { message: "Le titre doit contenir au maximum 120 caractères" }),

  description: z
    .string()
    .max(2000, {
      message: "La description doit contenir au maximum 2000 caractères",
    })
    .optional(),
  done: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
