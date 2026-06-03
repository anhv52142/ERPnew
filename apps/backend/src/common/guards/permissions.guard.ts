import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/requirements.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler());
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userId = req.user?.userId;
    const companyId = req.user?.companyId;
    if (!userId || !companyId) throw new ForbiddenException('Unauthenticated');

    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });

    const roleIds = userRoles.map((ur) => ur.roleId);
    const roles = await this.prisma.role.findMany({ where: { id: { in: roleIds } } });

    const allowed = new Set<string>();
    for (const role of roles) {
      const perms = (role.permissions as string[]) || [];
      perms.forEach((p) => allowed.add(p));
    }

    for (const perm of required) {
      if (allowed.has(perm) || allowed.has('*')) continue;
      throw new ForbiddenException(`Missing permission: ${perm}`);
    }

    return true;
  }
}
