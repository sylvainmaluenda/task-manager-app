import { useAuthStore } from "@/features/auth/store/auth.store";
import type { TaskWithCategory } from "../types/task.type";
import { TaskFormValues } from "@/features/tasks/shemas/task.shema";

import apiTasksRepository from "./apiTasksRepository";
import memoryTasksRepository from "./memoryTasksRepository";

interface TasksRepository {
  getTask(id: number): Promise<TaskWithCategory>;
  getTasks(): Promise<TaskWithCategory[]>;
  addTask(task: TaskFormValues): Promise<TaskWithCategory>;
  deleteTask(id: number): Promise<void>;
  updateTask(id: number, task: TaskFormValues): Promise<TaskWithCategory>;
}

const tasksRepository = (): TasksRepository => {
  const mode = useAuthStore.getState().mode;

  return mode === "guest" ? memoryTasksRepository : apiTasksRepository;
};

export default tasksRepository;
