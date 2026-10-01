import { TaskFormValues } from '@/features/tasks/shemas/task.shema';
import type { TaskWithCategory } from '@/features/tasks/types/task.type';
import { mockTasks } from '@/features/tasks/repositories/tasks.mock';
import { mockCategories } from '@/features/categories/repositories/categories.mock';
import { Category } from '@/features/categories/types/category.type';
import { delay } from '@/shared/lib/delay';

const memoryTasksRepository = {
  async getTasks(): Promise<TaskWithCategory[]> {
    await delay(800);

    const sortedTasks = new Map(
      [...mockTasks].sort(
        ([, a], [, b]) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );

    return [...sortedTasks.values()].map((task) => {
      const category: Category | null = task.categoryId
        ? (mockCategories.get(task.categoryId) ?? null)
        : null;

      return { ...task, category };
    });
  },

  async addTask(data: TaskFormValues): Promise<TaskWithCategory> {
    await delay(800);

    const { categoryId, title, done, description } = data;

    const lastId = [...mockTasks.keys()].reduce(
      (max, key) => (key > max ? key : max),
      0,
    );

    const task = {
      id: lastId + 1,
      categoryId,
      title,
      done,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTasks.set(lastId + 1, task);

    const category: Category | null = task.categoryId
      ? (mockCategories.get(task.categoryId) ?? null)
      : null;

    return { ...task, category };
  },

  async getTask(id: number): Promise<TaskWithCategory> {
    await delay(800);

    const task = mockTasks.get(id);

    if (!task) {
      throw new Error('Task id not found');
    }

    const category: Category | null = task.categoryId
      ? (mockCategories.get(task.categoryId) ?? null)
      : null;

    return { ...task, category };
  },

  async updateTask(
    id: number,
    data: TaskFormValues,
  ): Promise<TaskWithCategory> {
    await delay(800);

    const { categoryId, title, done, description } = data;

    const task = mockTasks.get(id);

    if (!task) {
      throw new Error('Task id not found');
    }

    const newTask = {
      ...task,
      categoryId,
      title,
      done,
      description,
      updatedAt: new Date().toISOString(),
    };

    mockTasks.set(id, newTask);

    const category: Category | null = newTask.categoryId
      ? (mockCategories.get(newTask.categoryId) ?? null)
      : null;

    return { ...newTask, category };
  },

  async deleteTask(id: number): Promise<void> {
    await delay(800);

    mockTasks.delete(id);
  },
};

export default memoryTasksRepository;
