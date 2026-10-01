import type {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
} from '@/features/auth/types/auth.types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const authServices = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  },

  getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp : null;
    } catch {
      return null;
    }
  },
};
