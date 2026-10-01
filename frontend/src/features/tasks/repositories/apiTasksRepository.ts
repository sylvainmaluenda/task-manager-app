import { TaskFormValues } from '@/features/tasks/shemas/task.shema';
import type { TaskWithCategory } from '../types/task.type';
import { delay } from '../../../shared/lib/delay';
import { useAuthStore } from '@/features/auth/store/auth.store';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiTasksRepository = {
  async addTask(data: TaskFormValues): Promise<TaskWithCategory> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Unable to create the task');
    }

    return response.json();
  },

  async getTasks(): Promise<TaskWithCategory[]> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error('Unable to retrieve the task');
    }

    return result;
  },

  async getTask(id: number): Promise<TaskWithCategory> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unable to retrieve the task');
    }

    return response.json();
  },

  async updateTask(
    id: number,
    data: TaskFormValues,
  ): Promise<TaskWithCategory> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Unable to update the task');
    }
    return response.json();
  },

  async deleteTask(id: number): Promise<void> {
    await delay(800);

    const token = useAuthStore.getState().token;

    const response = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Impossible de supprimer la tâche');
    }
  },
};

export default apiTasksRepository;
