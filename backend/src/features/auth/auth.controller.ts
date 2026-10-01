import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Throttle({ default: { ttl: 5, limit: 60000 } })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Throttle({ default: { ttl: 5, limit: 60000 } })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /*
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { ttl: 5, limit: 60000 } })
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    return {
      message: 'You are authenticated.',
      user: req.user, // ✅ filled par validate()
    };
  }
  */
}
