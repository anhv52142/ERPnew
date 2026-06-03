import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: { email: string; password: string; name: string; companyName?: string }) {
    const existing = await this.prisma.user.findFirst({ where: { email: dto.email, deletedAt: null } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcryptjs.hash(dto.password, 10);

    const company = await this.prisma.company.create({
      data: {
        name: dto.companyName || `${dto.name}'s Company`,
        slug: dto.email.split('@')[0] + '-' + Date.now().toString(36),
      },
    });

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const payload = { sub: user.id, email: user.email, companyId: company.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET') || 'hmt-erp-refresh-secret',
      expiresIn: '7d',
    });

    const { password, ...safeUser } = user;
    return { accessToken, refreshToken, user: safeUser, company };
  }

  async login(user: any, res?: Response) {
    const payload = { sub: user.userId || user.id, email: user.email, companyId: user.companyId };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET') || 'hmt-erp-refresh-secret',
      expiresIn: '7d',
    });

    if (res) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.config.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    await this.prisma.user.update({
      where: { id: user.userId || user.id },
      data: { lastLoginAt: new Date() },
    });

    return { accessToken, refreshToken, user };
  }

  async refresh(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET') || 'hmt-erp-refresh-secret',
      });
      const user = await this.prisma.user.findFirst({
        where: { id: payload.sub, deletedAt: null },
        select: { id: true, email: true, name: true },
      });
      if (!user) throw new UnauthorizedException();

      const newPayload = { sub: user.id, email: user.email, companyId: payload.companyId };
      const accessToken = await this.jwtService.signAsync(newPayload);
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
    if (!user) return null;
    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) return null;
    const { password: _, ...result } = user;
    return result;
  }
}
