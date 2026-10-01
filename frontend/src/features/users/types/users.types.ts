export interface UserState {
  user: User | null;
  updateUser: (date: UpdateUserFormData) => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserFormData {
  name?: string;
  email?: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
