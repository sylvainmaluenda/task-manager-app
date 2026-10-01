import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 600, // Max age in s of preflight CORS in navigator's cache
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // delete undefined properties in dto
      forbidNonWhitelisted: true, // return error if property is unknown
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
