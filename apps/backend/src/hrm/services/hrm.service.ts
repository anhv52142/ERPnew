import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { CreateLeaveDto } from '../dto/create-leave.dto';
import { UpdateLeaveDto } from '../dto/update-leave.dto';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';

@Injectable()
export class HrmService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Departments ───────────────────────────────────────────

  async createDepartment(companyId: string, dto: CreateDepartmentDto) {
    return this.prisma.department.create({ data: { ...dto, companyId } as any });
  }

  async findAllDepartments(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.department.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { branch: true } }),
      this.prisma.department.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneDepartment(companyId: string, id: string) {
    return this.prisma.department.findFirst({ where: { id, companyId, deletedAt: null }, include: { branch: true } });
  }

  async updateDepartment(companyId: string, id: string, dto: UpdateDepartmentDto) {
    return this.prisma.department.update({ where: { id, companyId }, data: dto as any });
  }

  async removeDepartment(companyId: string, id: string) {
    return this.prisma.department.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Positions ─────────────────────────────────────────────

  async createPosition(companyId: string, dto: CreatePositionDto) {
    return this.prisma.position.create({ data: { ...dto, companyId } as any });
  }

  async findAllPositions(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.position.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { department: true } }),
      this.prisma.position.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOnePosition(companyId: string, id: string) {
    return this.prisma.position.findFirst({ where: { id, companyId, deletedAt: null }, include: { department: true } });
  }

  async updatePosition(companyId: string, id: string, dto: UpdatePositionDto) {
    return this.prisma.position.update({ where: { id, companyId }, data: dto as any });
  }

  async removePosition(companyId: string, id: string) {
    return this.prisma.position.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Employees ─────────────────────────────────────────────

  async createEmployee(companyId: string, dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...dto,
        companyId,
        fullName: `${dto.firstName} ${dto.lastName}`,
        hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        idIssueDate: dto.idIssueDate ? new Date(dto.idIssueDate) : undefined,
      } as any,
    });
  }

  async findAllEmployees(companyId: string, page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { employeeCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { branch: true, department: true, position: true },
      }),
      this.prisma.employee.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneEmployee(companyId: string, id: string) {
    return this.prisma.employee.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { branch: true, department: true, position: true },
    });
  }

  async updateEmployee(companyId: string, id: string, dto: UpdateEmployeeDto) {
    const data: any = { ...dto };
    if (dto.firstName || dto.lastName) {
      const existing = await this.prisma.employee.findFirst({ where: { id, companyId } });
      data.fullName = `${dto.firstName || existing?.firstName || ''} ${dto.lastName || existing?.lastName || ''}`;
    }
    if (dto.hireDate) data.hireDate = new Date(dto.hireDate);
    if (dto.dateOfBirth) data.dateOfBirth = new Date(dto.dateOfBirth);
    if (dto.idIssueDate) data.idIssueDate = new Date(dto.idIssueDate);
    return this.prisma.employee.update({ where: { id, companyId }, data });
  }

  async removeEmployee(companyId: string, id: string) {
    return this.prisma.employee.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Attendance ────────────────────────────────────────────

  async createAttendance(companyId: string, dto: CreateAttendanceDto) {
    return this.prisma.attendance.create({
      data: {
        ...dto,
        companyId,
        date: new Date(dto.date),
        checkIn: dto.checkIn ? new Date(dto.checkIn) : undefined,
        checkOut: dto.checkOut ? new Date(dto.checkOut) : undefined,
      } as any,
    });
  }

  async findAllAttendances(companyId: string, page = 1, limit = 20, employeeId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (employeeId) where.employeeId = employeeId;
    const [items, total] = await Promise.all([
      this.prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: { employee: true },
      }),
      this.prisma.attendance.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneAttendance(companyId: string, id: string) {
    return this.prisma.attendance.findFirst({ where: { id, companyId, deletedAt: null }, include: { employee: true } });
  }

  async updateAttendance(companyId: string, id: string, dto: UpdateAttendanceDto) {
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    if (dto.checkIn) data.checkIn = new Date(dto.checkIn);
    if (dto.checkOut) data.checkOut = new Date(dto.checkOut);
    return this.prisma.attendance.update({ where: { id, companyId }, data });
  }

  async removeAttendance(companyId: string, id: string) {
    return this.prisma.attendance.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Leave ─────────────────────────────────────────────────

  async createLeave(companyId: string, dto: CreateLeaveDto) {
    return this.prisma.leave.create({
      data: {
        ...dto,
        companyId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      } as any,
    });
  }

  async findAllLeaves(companyId: string, page = 1, limit = 20, employeeId?: string, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (employeeId) where.employeeId = employeeId;
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.leave.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { employee: true, approvedBy: true },
      }),
      this.prisma.leave.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneLeave(companyId: string, id: string) {
    return this.prisma.leave.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { employee: true, approvedBy: true },
    });
  }

  async updateLeave(companyId: string, id: string, dto: UpdateLeaveDto) {
    const data: any = { ...dto };
    if (dto.status === 'approved') data.approvedAt = new Date();
    return this.prisma.leave.update({ where: { id, companyId }, data });
  }

  async removeLeave(companyId: string, id: string) {
    return this.prisma.leave.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Contracts ─────────────────────────────────────────────

  async createContract(companyId: string, dto: CreateContractDto) {
    return this.prisma.contract.create({
      data: {
        ...dto,
        companyId,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      } as any,
    });
  }

  async findAllContracts(companyId: string, page = 1, limit = 20, employeeId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (employeeId) where.employeeId = employeeId;
    const [items, total] = await Promise.all([
      this.prisma.contract.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { employee: true },
      }),
      this.prisma.contract.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneContract(companyId: string, id: string) {
    return this.prisma.contract.findFirst({ where: { id, companyId, deletedAt: null }, include: { employee: true } });
  }

  async updateContract(companyId: string, id: string, dto: UpdateContractDto) {
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.contract.update({ where: { id, companyId }, data });
  }

  async removeContract(companyId: string, id: string) {
    return this.prisma.contract.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
