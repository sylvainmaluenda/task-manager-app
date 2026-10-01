import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/jwt-strategy';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { userWithPasswordSelect } from 'src/features/users/users.select';
import {
  SafeUser,
  UserWithPassword,
} from 'src/features/users/types/user-response.type';
import { AuthResponse } from './types/auth-response.type';
import { validatePassword } from 'src/common/utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByEmail(email: string): Promise<UserWithPassword | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: userWithPasswordSelect,
    });

    return user;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.findOneByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const safeUser: SafeUser = await this.usersService.create(registerDto);
    const token = this.generateToken(safeUser.id, safeUser.email);

    return {
      user: safeUser,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.findOneByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);
    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      access_token: token,
    };
  }

  private generateToken(userId: number, email: string): string {
    const payload: JwtPayload = { sub: userId };
    return this.jwtService.sign(payload, {
      expiresIn: 15 * 60,
    });
  }
}
