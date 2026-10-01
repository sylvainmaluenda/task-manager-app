import type { User } from "@/features/users/types/users.types";

export type AuthMode = "authenticated" | "guest";

export interface AuthState {
  user: User | null;
  token: string | null;
  mode: AuthMode | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserFormData {
  name?: string;
  email?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
