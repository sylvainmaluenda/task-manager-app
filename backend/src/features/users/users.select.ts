import { Prisma } from '@prisma/client';

export const safeUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.UserSelect;

export const userWithPasswordSelect = {
  ...safeUserSelect,
  password: true,
} satisfies Prisma.UserSelect;
