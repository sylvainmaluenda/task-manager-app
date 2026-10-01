import { SafeUser } from 'src/features/users/types/user-response.type';

export type AuthResponse = {
  user: SafeUser;
  access_token: string;
};
