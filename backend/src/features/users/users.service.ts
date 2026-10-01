import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Role } from './entities/user.entity';
import { safeUserSelect, userWithPasswordSelect } from './users.select';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SafeUser, UserWithPassword } from './types/user-response.type';
import {
  hashPassword,
  validatePassword,
} from 'src/common/utils/password.utils';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const hashed_password = await hashPassword(createUserDto.password);

    const { password, ...userData } = createUserDto;

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        password: hashed_password,
        role: createUserDto.role ?? Role.USER,
      },
      select: safeUserSelect,
    });

    return user;
  }

  /*
  async findAll(role?: Role): Promise<SafeUser[]> {
    return await this.prismaService.user.findMany({
      where: role ? { role } : undefined,
      select: safeUserSelect,
    });
  }
  
  async findOne(id: number): Promise<SafeUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: safeUserSelect,
    });

    if (!user) return null;

    return user;
  }
  */

  async findOneWithPassword(id: number): Promise<UserWithPassword | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: userWithPasswordSelect,
    });

    if (!user) return null;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<SafeUser> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: safeUserSelect,
    });
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.findOneWithPassword(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await validatePassword(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is invalid');
    }

    const { currentPassword, newPassword } = updatePasswordDto;

    if (currentPassword === newPassword) {
      throw new BadRequestException(
        'New password cannot be the same as the current password',
      );
    }

    const hashed_password = await hashPassword(newPassword);

    await this.prismaService.user.update({
      where: { id },
      data: {
        password: hashed_password,
      },
      select: safeUserSelect,
    });
  }

  /*
  async remove(id: number): Promise<SafeUser> {
    return await this.prismaService.user.delete({
      where: { id },
      select: safeUserSelect,
    });
  }
  */
}
