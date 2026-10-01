import { fetchWrapper } from "./fetchWrapper";
import { useAuthStore } from "@/features/auth/store/auth.store";

const API_URL = import.meta.env.VITE_API_URL;

export function apiClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;

  return fetchWrapper<T>(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}
