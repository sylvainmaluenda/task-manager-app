import { TaskFormValues } from "@/features/tasks/shemas/task.shema";
import type { Task, TaskWithCategory } from "../types/task.type";
import tasksRepository from "../repositories/tasksRepository";

export async function addTask(data: TaskFormValues): Promise<Task> {
  return await tasksRepository().addTask(data);
}

export async function getTasks(): Promise<TaskWithCategory[]> {
  return await tasksRepository().getTasks();
}

export async function getTask(id: number): Promise<Task> {
  return await tasksRepository().getTask(id);
}

export async function updateTask(
  id: number,
  data: TaskFormValues,
): Promise<Task> {
  return await tasksRepository().updateTask(id, data);
}

export async function deleteTask(id: number): Promise<void> {
  await tasksRepository().deleteTask(id);
}
