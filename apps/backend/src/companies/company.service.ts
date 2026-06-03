import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString(36);
    return this.prisma.company.create({
      data: { ...dto, slug } as any,
    });
  }

  async findAll(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? { name: { contains: search, mode: 'insensitive' as const }, deletedAt: null }
      : { deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    return this.prisma.company.findFirst({ where: { id, deletedAt: null } });
  }

  async update(id: string, dto: UpdateCompanyDto) {
    return this.prisma.company.update({ where: { id }, data: dto as any });
  }

  async remove(id: string) {
    return this.prisma.company.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
