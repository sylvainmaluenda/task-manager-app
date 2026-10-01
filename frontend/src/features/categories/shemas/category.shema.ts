import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom de la catégorie est obligatoire" })
    .max(120, {
      message: "Le nom de la catégorie doit contenir au maximum 120 caractères",
    }),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
