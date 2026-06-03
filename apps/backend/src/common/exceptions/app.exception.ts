import { BadRequestException } from '@nestjs/common';

export class AppException extends BadRequestException {
  constructor(public code: string, message: string) {
    super({ code, message });
  }
}

export class NotFoundException extends BadRequestException {
  constructor(entity: string, id: string) {
    super({ code: 'NOT_FOUND', message: `${entity} with id ${id} not found` });
  }
}

export class ForbiddenException extends BadRequestException {
  constructor(message = 'Forbidden') {
    super({ code: 'FORBIDDEN', message });
  }
}
