import { authServices } from '@/features/auth/services/auth.service';
import type {
  AuthState,
  LoginFormData,
  RegisterFormData,
} from '@/features/auth/types/auth.types';

import { useUserStore } from '@/features/users/store/user.store';
import { delay } from '@/shared/lib/delay';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      mode: null,

      login: async (data: LoginFormData) => {
        const result = await authServices.login(data);

        // local storage managed in zustand/persist
        // localStorage.setItem("token", result.access_token);

        set({
          mode: 'authenticated',
          token: result.access_token,
        });

        useUserStore.getState().setUser(result.user);
      },

      register: async (data: RegisterFormData) => {
        const result = await authServices.register(data);

        set({
          mode: 'authenticated',
          token: result.access_token,
        });

        useUserStore.getState().setUser(result.user);
      },

      continueAsGuest: async () => {
        await delay(800);

        set({
          mode: 'guest',
          token: null,
        });
      },

      logout: () => {
        set({
          mode: 'authenticated',
          token: null,
        });
        useUserStore.getState().clearUser();

        // localStorage.removeItem("auth-storage");
        // localStorage.removeItem("user-storage");

        useAuthStore.persist.clearStorage();
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
