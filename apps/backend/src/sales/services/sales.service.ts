import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';
import { CreateSalesOrderDto } from '../dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from '../dto/update-sales-order.dto';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Quotations ─────────────────────────────────────────────

  async createQuotation(companyId: string, dto: CreateQuotationDto) {
    const data: any = { ...dto, companyId };
    if (dto.issueDate) data.issueDate = new Date(dto.issueDate);
    if (dto.expiryDate) data.expiryDate = new Date(dto.expiryDate);
    return this.prisma.quotation.create({ data });
  }

  async findAllQuotations(companyId: string, page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.quotation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { customer: true, items: true },
      }),
      this.prisma.quotation.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneQuotation(companyId: string, id: string) {
    return this.prisma.quotation.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { customer: true, items: { include: { product: true } } },
    });
  }

  async updateQuotation(companyId: string, id: string, dto: UpdateQuotationDto) {
    const data: any = { ...dto };
    if (dto.issueDate) data.issueDate = new Date(dto.issueDate);
    if (dto.expiryDate) data.expiryDate = new Date(dto.expiryDate);
    return this.prisma.quotation.update({ where: { id, companyId }, data });
  }

  async removeQuotation(companyId: string, id: string) {
    return this.prisma.quotation.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Sales Orders ───────────────────────────────────────────

  async createSalesOrder(companyId: string, dto: CreateSalesOrderDto) {
    const data: any = { ...dto, companyId };
    if (dto.orderDate) data.orderDate = new Date(dto.orderDate);
    if (dto.deliveryDate) data.deliveryDate = new Date(dto.deliveryDate);
    return this.prisma.salesOrder.create({ data });
  }

  async findAllSalesOrders(companyId: string, page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { customer: true, items: true },
      }),
      this.prisma.salesOrder.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneSalesOrder(companyId: string, id: string) {
    return this.prisma.salesOrder.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { customer: true, items: { include: { product: true } }, quotation: true },
    });
  }

  async updateSalesOrder(companyId: string, id: string, dto: UpdateSalesOrderDto) {
    const data: any = { ...dto };
    if (dto.orderDate) data.orderDate = new Date(dto.orderDate);
    if (dto.deliveryDate) data.deliveryDate = new Date(dto.deliveryDate);
    return this.prisma.salesOrder.update({ where: { id, companyId }, data });
  }

  async removeSalesOrder(companyId: string, id: string) {
    return this.prisma.salesOrder.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Invoices ───────────────────────────────────────────────

  async createInvoice(companyId: string, dto: CreateInvoiceDto) {
    const data: any = { ...dto, companyId };
    if (dto.issueDate) data.issueDate = new Date(dto.issueDate);
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.invoice.create({ data });
  }

  async findAllInvoices(companyId: string, page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { customer: true },
      }),
      this.prisma.invoice.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneInvoice(companyId: string, id: string) {
    return this.prisma.invoice.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { customer: true, salesOrder: true, payments: true },
    });
  }

  async updateInvoice(companyId: string, id: string, dto: UpdateInvoiceDto) {
    const data: any = { ...dto };
    if (dto.issueDate) data.issueDate = new Date(dto.issueDate);
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.invoice.update({ where: { id, companyId }, data });
  }

  async removeInvoice(companyId: string, id: string) {
    return this.prisma.invoice.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Payments ───────────────────────────────────────────────

  async createPayment(companyId: string, dto: CreatePaymentDto) {
    return this.prisma.payment.create({ data: { ...dto, companyId } as any });
  }

  async findAllPayments(companyId: string, page = 1, limit = 20, invoiceId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (invoiceId) where.invoiceId = invoiceId;
    const [items, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { invoice: true },
      }),
      this.prisma.payment.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOnePayment(companyId: string, id: string) {
    return this.prisma.payment.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { invoice: true },
    });
  }

  async updatePayment(companyId: string, id: string, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({ where: { id, companyId }, data: dto as any });
  }

  async removePayment(companyId: string, id: string) {
    return this.prisma.payment.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
