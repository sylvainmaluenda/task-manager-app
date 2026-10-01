import type {
  UserState,
  UpdateUserFormData,
  User,
} from "@/features/users/types/users.types";
import { usersService } from "@/features/users/services/users.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null as User | null,

      updateUser: async (data: UpdateUserFormData): Promise<void> => {
        const { user } = get();

        if (!user) {
          throw new Error("User not found");
        }

        const result: User = await usersService.updateUser(data);

        set({
          user: result,
        });

        return;
      },

      setUser: (user: User): void => {
        set({ user });
      },

      clearUser: (): void => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
