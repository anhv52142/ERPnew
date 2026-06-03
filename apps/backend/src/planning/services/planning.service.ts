import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { CreateMilestoneDto } from '../dto/create-milestone.dto';
import { UpdateMilestoneDto } from '../dto/update-milestone.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';

@Injectable()
export class PlanningService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Projects ───────────────────────────────────────────────

  async createProject(companyId: string, dto: CreateProjectDto) {
    const data: any = { ...dto, companyId };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.project.create({ data });
  }

  async findAllProjects(companyId: string, page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { manager: true, milestones: true },
      }),
      this.prisma.project.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneProject(companyId: string, id: string) {
    return this.prisma.project.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { manager: true, milestones: true, tasks: true },
    });
  }

  async updateProject(companyId: string, id: string, dto: UpdateProjectDto) {
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.project.update({ where: { id, companyId }, data });
  }

  async removeProject(companyId: string, id: string) {
    return this.prisma.project.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Milestones ─────────────────────────────────────────────

  async createMilestone(companyId: string, dto: CreateMilestoneDto) {
    const data: any = { ...dto, companyId };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.milestone.create({ data });
  }

  async findAllMilestones(companyId: string, page = 1, limit = 20, projectId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (projectId) where.projectId = projectId;
    const [items, total] = await Promise.all([
      this.prisma.milestone.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dueDate: 'asc' },
        include: { project: true, tasks: true },
      }),
      this.prisma.milestone.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneMilestone(companyId: string, id: string) {
    return this.prisma.milestone.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { project: true, tasks: true },
    });
  }

  async updateMilestone(companyId: string, id: string, dto: UpdateMilestoneDto) {
    const data: any = { ...dto };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.milestone.update({ where: { id, companyId }, data });
  }

  async removeMilestone(companyId: string, id: string) {
    return this.prisma.milestone.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Tasks ──────────────────────────────────────────────────

  async createTask(companyId: string, dto: CreateTaskDto) {
    const data: any = { ...dto, companyId };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.task.create({ data });
  }

  async findAllTasks(companyId: string, page = 1, limit = 20, projectId?: string, assigneeId?: string, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (projectId) where.projectId = projectId;
    if (assigneeId) where.assigneeId = assigneeId;
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { project: true, milestone: true, assignee: true },
      }),
      this.prisma.task.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneTask(companyId: string, id: string) {
    return this.prisma.task.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { project: true, milestone: true, assignee: true },
    });
  }

  async updateTask(companyId: string, id: string, dto: UpdateTaskDto) {
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.task.update({ where: { id, companyId }, data });
  }

  async removeTask(companyId: string, id: string) {
    return this.prisma.task.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Resources ──────────────────────────────────────────────

  async createResource(companyId: string, dto: CreateResourceDto) {
    return this.prisma.resource.create({ data: { ...dto, companyId } as any });
  }

  async findAllResources(companyId: string, page = 1, limit = 20, type?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (type) where.type = type;
    const [items, total] = await Promise.all([
      this.prisma.resource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { employee: true },
      }),
      this.prisma.resource.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneResource(companyId: string, id: string) {
    return this.prisma.resource.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { employee: true },
    });
  }

  async updateResource(companyId: string, id: string, dto: UpdateResourceDto) {
    return this.prisma.resource.update({ where: { id, companyId }, data: dto as any });
  }

  async removeResource(companyId: string, id: string) {
    return this.prisma.resource.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
