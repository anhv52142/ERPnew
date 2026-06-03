import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    let message = 'Database operation failed';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002':
        message = 'A record with this value already exists';
        status = HttpStatus.CONFLICT;
        break;
      case 'P2025':
        message = 'Record not found';
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2003':
        message = 'Foreign key constraint failed';
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2014':
        message = 'The change you are trying to make would violate a required relation';
        status = HttpStatus.BAD_REQUEST;
        break;
    }

    this.logger.error(`Prisma Error (${exception.code}): ${message}`, exception.meta);

    throw new BadRequestException({ code: 'DATABASE_ERROR', message, detail: exception.meta });
  }
}
