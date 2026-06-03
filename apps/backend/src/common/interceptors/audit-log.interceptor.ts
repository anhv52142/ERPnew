import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

interface AuthenticatedUser {
  userId: string;
  email: string;
  companyId: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const res = context.switchToHttp().getResponse();
    const { method, url, params, user } = req;

    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (data) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          try {
            const entityType = url.split('/').pop() || 'unknown';

            await this.prisma.auditLog.create({
              data: {
                companyId: user?.companyId ?? '',
                userId: user?.userId ?? '',
                action: method,
                entityType,
                entityId: params?.id || data?.id || 'unknown',
                oldValue: params ? (JSON.stringify(params) as Prisma.InputJsonValue) : Prisma.JsonNull,
                newValue: data ? (JSON.stringify(data) as Prisma.InputJsonValue) : Prisma.JsonNull,
                ipAddress: req.ip,
                userAgent: req.get('user-agent') || undefined,
              },
            });
          } catch {
            // ignore audit logging errors
          }
        }
      }),
    );
  }
}
