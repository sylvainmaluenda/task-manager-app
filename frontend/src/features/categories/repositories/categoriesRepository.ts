import { useAuthStore } from "@/features/auth/store/auth.store";
import apiCategoriesRepository from "./apiCategoriesRepository";
import memoryCategoriesRepository from "./memoryCategoriesRepository";
import { Category } from "../types/category.type";
import { CategoryFormValues } from "../shemas/category.shema";

interface CategoriesRepository {
  getCategory(id: number): Promise<Category>;
  getCategories(): Promise<Category[]>;
  addCategory(data: CategoryFormValues): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
  updateCategory(id: number, category: CategoryFormValues): Promise<Category>;
}

const categoriesRepository = (): CategoriesRepository => {
  const mode = useAuthStore.getState().mode;

  return mode === "guest"
    ? memoryCategoriesRepository
    : apiCategoriesRepository;
};

export default categoriesRepository;
