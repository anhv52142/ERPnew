import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { CreateTaxDto } from '../dto/create-tax.dto';
import { UpdateTaxDto } from '../dto/update-tax.dto';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Chart of Accounts ──────────────────────────────────────

  async createAccount(companyId: string, dto: CreateAccountDto) {
    return this.prisma.chartOfAccount.create({ data: { ...dto, companyId } as any });
  }

  async findAllAccounts(companyId: string, page = 1, limit = 20, type?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (type) where.type = type;
    const [items, total] = await Promise.all([
      this.prisma.chartOfAccount.findMany({ where, skip, take: limit, orderBy: { code: 'asc' } }),
      this.prisma.chartOfAccount.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneAccount(companyId: string, id: string) {
    return this.prisma.chartOfAccount.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateAccount(companyId: string, id: string, dto: UpdateAccountDto) {
    return this.prisma.chartOfAccount.update({ where: { id, companyId }, data: dto as any });
  }

  async removeAccount(companyId: string, id: string) {
    return this.prisma.chartOfAccount.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Bank Accounts ──────────────────────────────────────────

  async createBankAccount(companyId: string, dto: CreateBankAccountDto) {
    return this.prisma.bankAccount.create({ data: { ...dto, companyId } as any });
  }

  async findAllBankAccounts(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.bankAccount.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.bankAccount.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneBankAccount(companyId: string, id: string) {
    return this.prisma.bankAccount.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateBankAccount(companyId: string, id: string, dto: UpdateBankAccountDto) {
    return this.prisma.bankAccount.update({ where: { id, companyId }, data: dto as any });
  }

  async removeBankAccount(companyId: string, id: string) {
    return this.prisma.bankAccount.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Expenses ───────────────────────────────────────────────

  async createExpense(companyId: string, dto: CreateExpenseDto) {
    const data: any = { ...dto, companyId };
    if (dto.expenseDate) data.expenseDate = new Date(dto.expenseDate);
    return this.prisma.expense.create({ data });
  }

  async findAllExpenses(companyId: string, page = 1, limit = 20, category?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (category) where.category = category;
    const [items, total] = await Promise.all([
      this.prisma.expense.findMany({ where, skip, take: limit, orderBy: { expenseDate: 'desc' } }),
      this.prisma.expense.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneExpense(companyId: string, id: string) {
    return this.prisma.expense.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateExpense(companyId: string, id: string, dto: UpdateExpenseDto) {
    const data: any = { ...dto };
    if (dto.expenseDate) data.expenseDate = new Date(dto.expenseDate);
    return this.prisma.expense.update({ where: { id, companyId }, data });
  }

  async removeExpense(companyId: string, id: string) {
    return this.prisma.expense.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Taxes ──────────────────────────────────────────────────

  async createTax(companyId: string, dto: CreateTaxDto) {
    return this.prisma.tax.create({ data: { ...dto, companyId } as any });
  }

  async findAllTaxes(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.tax.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.tax.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneTax(companyId: string, id: string) {
    return this.prisma.tax.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateTax(companyId: string, id: string, dto: UpdateTaxDto) {
    return this.prisma.tax.update({ where: { id, companyId }, data: dto as any });
  }

  async removeTax(companyId: string, id: string) {
    return this.prisma.tax.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
