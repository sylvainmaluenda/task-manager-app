import { useAuthStore } from "@/features/auth/store/auth.store";
import type {
  UpdatePasswordPayload,
  UpdateUserFormData,
  User,
} from "@/features/users/types/users.types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usersService = {
  async getProfile(): Promise<User> {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  },

  async updateUser(data: UpdateUserFormData): Promise<User> {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BACKEND_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  },

  async updatePassword(data: UpdatePasswordPayload): Promise<void> {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BACKEND_URL}/users/me/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || "Request failed");
    }

    // 204 => nothing to parse, just return
    return;
  },
};
