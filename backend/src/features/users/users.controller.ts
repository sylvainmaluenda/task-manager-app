import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SafeUser } from './types/user-response.type';

//👉 Prisma retourne null uniquement dans les requêtes de lecture “non strictes” (find)
//👉 Prisma ne retourne presque jamais null en écriture (create/update/delete) — il throw une erreur à la

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
  */

  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<SafeUser> {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Patch('me/password')
  @HttpCode(204)
  updatePassword(
    @Req() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    return this.usersService.updatePassword(req.user.userId, updatePasswordDto);
  }
}
