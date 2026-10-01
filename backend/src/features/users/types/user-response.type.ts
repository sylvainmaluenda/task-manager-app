import { Prisma } from '@prisma/client';
import { safeUserSelect, userWithPasswordSelect } from '../users.select';

export type SafeUser = Prisma.UserGetPayload<{
  select: typeof safeUserSelect;
}>;

export type UserWithPassword = Prisma.UserGetPayload<{
  select: typeof userWithPasswordSelect;
}>;
