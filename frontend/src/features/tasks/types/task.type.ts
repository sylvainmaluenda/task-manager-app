import { Category } from "../../categories/types/category.type";

export interface Task {
  id: number;
  categoryId: number | null;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskWithCategory = Task & {
  category: Category | null;
};

export interface UpdateTask {
  categoryId: number;
  title: string;
  description: string;
  done: boolean;
}
