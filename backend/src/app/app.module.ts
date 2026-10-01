import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { UsersModule } from '../features/users/users.module';
import { AuthModule } from '../features/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TasksModule } from 'src/features/tasks/tasks.module';
import { CategoriesModule } from 'src/features/categories/categories.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 1,
      },
    ]),
    PrismaModule,
    UsersModule,
    AuthModule,
    TasksModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
