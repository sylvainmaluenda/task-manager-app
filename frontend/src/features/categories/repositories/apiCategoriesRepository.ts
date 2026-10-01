import { delay } from "../../../shared/lib/delay";
import { Category } from "@/features/categories/types/category.type";
import { CategoryFormValues } from "@/features/categories/shemas/category.shema";
import { useAuthStore } from "@/features/auth/store/auth.store";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiCategoriesRepository = {
  async addCategory(data: CategoryFormValues): Promise<Category> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Impossible de créer la catégorie");
    }

    return response.json();
  },

  async getCategories(): Promise<Category[]> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les catégories");
    }

    return response.json();
  },

  async getCategory(id: number): Promise<Category> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer la catégorie");
    }

    return response.json();
  },

  async updateCategory(
    id: number,
    data: CategoryFormValues,
  ): Promise<Category> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Impossible de mettre à jour la catégorie");
    }

    return response.json();
  },

  async deleteCategory(id: number): Promise<void> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de supprimer la catégorie");
    }
  },
};

export default apiCategoriesRepository;
