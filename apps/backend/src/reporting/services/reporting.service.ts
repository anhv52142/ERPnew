import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { CreateDashboardDto } from '../dto/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/update-dashboard.dto';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { UpdateWidgetDto } from '../dto/update-widget.dto';

@Injectable()
export class ReportingService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Reports ────────────────────────────────────────────────

  async createReport(companyId: string, dto: CreateReportDto) {
    return this.prisma.report.create({ data: { ...dto, companyId } as any });
  }

  async findAllReports(companyId: string, page = 1, limit = 20, type?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (type) where.type = type;
    const [items, total] = await Promise.all([
      this.prisma.report.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.report.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneReport(companyId: string, id: string) {
    return this.prisma.report.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateReport(companyId: string, id: string, dto: UpdateReportDto) {
    return this.prisma.report.update({ where: { id, companyId }, data: dto as any });
  }

  async removeReport(companyId: string, id: string) {
    return this.prisma.report.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Dashboards ─────────────────────────────────────────────

  async createDashboard(companyId: string, dto: CreateDashboardDto) {
    return this.prisma.dashboard.create({ data: { ...dto, companyId } as any });
  }

  async findAllDashboards(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.dashboard.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { widgets: true },
      }),
      this.prisma.dashboard.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneDashboard(companyId: string, id: string) {
    return this.prisma.dashboard.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { widgets: true },
    });
  }

  async updateDashboard(companyId: string, id: string, dto: UpdateDashboardDto) {
    return this.prisma.dashboard.update({ where: { id, companyId }, data: dto as any });
  }

  async removeDashboard(companyId: string, id: string) {
    return this.prisma.dashboard.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Widgets ────────────────────────────────────────────────

  async createWidget(companyId: string, dto: CreateWidgetDto) {
    return this.prisma.widget.create({ data: dto as any });
  }

  async findAllWidgets(dashboardId: string) {
    return this.prisma.widget.findMany({
      where: { dashboardId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneWidget(dashboardId: string, id: string) {
    return this.prisma.widget.findFirst({ where: { id, dashboardId, deletedAt: null } });
  }

  async updateWidget(dashboardId: string, id: string, dto: UpdateWidgetDto) {
    return this.prisma.widget.update({ where: { id, dashboardId }, data: dto as any });
  }

  async removeWidget(dashboardId: string, id: string) {
    return this.prisma.widget.update({ where: { id, dashboardId }, data: { deletedAt: new Date() } });
  }
}
