import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Logs serveur complets uniquement
    this.logger.error(exception);

    let httpException: HttpException;

    // ----------------------------------------
    // Known Prisma Errors
    // ----------------------------------------
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      httpException = this.handleKnownRequestError(exception);
    }

    // ----------------------------------------
    // Validation Errors
    // ----------------------------------------
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      httpException = new HttpException(
        'Invalid database query.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // ----------------------------------------
    // Initialization Errors
    // ----------------------------------------
    else if (exception instanceof Prisma.PrismaClientInitializationError) {
      httpException = new InternalServerErrorException(
        'Database initialization failed.',
      );
    }

    // ----------------------------------------
    // Prisma Engine Panic
    // ----------------------------------------
    else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      httpException = new InternalServerErrorException(
        'Database engine crashed.',
      );
    }

    // ----------------------------------------
    // Unknown Prisma Errors
    // ----------------------------------------
    else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      httpException = new InternalServerErrorException(
        'Unknown database error.',
      );
    }

    // ----------------------------------------
    // Fallback
    // ----------------------------------------
    else {
      httpException = new InternalServerErrorException(
        'Internal server error.',
      );
    }

    response.status(httpException.getStatus()).json({
      statusCode: httpException.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: httpException.message,
    });
  }

  // =========================================================
  // Prisma Known Errors
  // =========================================================

  private handleKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    switch (exception.code) {
      // -----------------------------------------------------
      // Unique constraint violation
      // -----------------------------------------------------
      case 'P2002':
        return this.handleUniqueConstraint(exception);

      // -----------------------------------------------------
      // Record not found
      // -----------------------------------------------------
      case 'P2025':
        return new NotFoundException('Resource not found.');

      // -----------------------------------------------------
      // Foreign key violation
      // -----------------------------------------------------
      case 'P2003':
        return new ConflictException('Foreign key constraint failed.');

      // -----------------------------------------------------
      // Relation constraint violation
      // -----------------------------------------------------
      case 'P2014':
        return new ConflictException('Invalid relation reference.');

      // -----------------------------------------------------
      // Invalid query / malformed input
      // -----------------------------------------------------
      case 'P2005':
      case 'P2006':
      case 'P2007':
      case 'P2009':
        return new HttpException(
          'Invalid database query.',
          HttpStatus.BAD_REQUEST,
        );

      // -----------------------------------------------------
      // Unknown Prisma known error
      // -----------------------------------------------------
      default:
        return new InternalServerErrorException('Database operation failed.');
    }
  }

  // =========================================================
  // Unique Constraints
  // =========================================================

  private handleUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    const fields = this.extractConstraintFields(exception);

    if (fields.includes('email')) {
      return new ConflictException('Email already exists.');
    }

    if (fields.includes('username')) {
      return new ConflictException('Username already exists.');
    }

    return new ConflictException('Unique constraint violation.');
  }

  // =========================================================
  // Constraint Fields Extraction
  // =========================================================

  private extractConstraintFields(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string[] {
    const meta = exception.meta as any;

    // Prisma classique
    if (Array.isArray(meta?.target)) {
      return meta.target;
    }

    // PostgreSQL adapter
    if (meta?.driverAdapterError?.cause?.constraint?.fields) {
      return meta.driverAdapterError.cause.constraint.fields;
    }

    return [];
  }
}
