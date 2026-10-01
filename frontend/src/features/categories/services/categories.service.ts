import { Category } from "@/features/categories/types/category.type";
import { CategoryFormValues } from "@/features/categories/shemas/category.shema";
import categoriesRepository from "../repositories/categoriesRepository";

export async function addCategory(data: CategoryFormValues): Promise<Category> {
  return await categoriesRepository().addCategory(data);
}

export async function getCategories(): Promise<Category[]> {
  return await categoriesRepository().getCategories();
}

export async function getCategory(id: number): Promise<Category> {
  return await categoriesRepository().getCategory(id);
}

export async function updateCategory(
  id: number,
  data: CategoryFormValues,
): Promise<Category> {
  return await categoriesRepository().updateCategory(id, data);
}

export async function deleteCategory(id: number): Promise<void> {
  return await categoriesRepository().deleteCategory(id);
}
