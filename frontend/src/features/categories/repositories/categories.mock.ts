import type { Category } from "@/features/categories/types/category.type";

export const mockCategories: Map<number, Category> = new Map([
  [
    1,
    {
      id: 1,
      name: "Courses",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    2,
    {
      id: 2,
      name: "Travail",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    3,
    {
      id: 3,
      name: "Vacances",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
]);
