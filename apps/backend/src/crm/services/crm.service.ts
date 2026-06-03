import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateOpportunityDto } from '../dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';

@Injectable()
export class CrmService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Leads ──────────────────────────────────────────────────

  async createLead(companyId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: { ...dto, companyId } as any });
  }

  async findAllLeads(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, owner: true },
      }),
      this.prisma.lead.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneLead(companyId: string, id: string) {
    return this.prisma.lead.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { company: true, owner: true, opportunities: true, activities: true },
    });
  }

  async updateLead(companyId: string, id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({ where: { id, companyId }, data: dto as any });
  }

  async removeLead(companyId: string, id: string) {
    return this.prisma.lead.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Customers ──────────────────────────────────────────────

  async createCustomer(companyId: string, dto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: { ...dto, companyId } as any });
  }

  async findAllCustomers(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, contacts: true },
      }),
      this.prisma.customer.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneCustomer(companyId: string, id: string) {
    return this.prisma.customer.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { company: true, contacts: true, opportunities: true },
    });
  }

  async updateCustomer(companyId: string, id: string, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({ where: { id, companyId }, data: dto as any });
  }

  async removeCustomer(companyId: string, id: string) {
    return this.prisma.customer.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Contacts ───────────────────────────────────────────────

  async createContact(companyId: string, dto: CreateContactDto) {
    return this.prisma.contact.create({ data: { ...dto, companyId } as any });
  }

  async findAllContacts(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, customer: true },
      }),
      this.prisma.contact.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneContact(companyId: string, id: string) {
    return this.prisma.contact.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { company: true, customer: true },
    });
  }

  async updateContact(companyId: string, id: string, dto: UpdateContactDto) {
    return this.prisma.contact.update({ where: { id, companyId }, data: dto as any });
  }

  async removeContact(companyId: string, id: string) {
    return this.prisma.contact.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Opportunities ──────────────────────────────────────────

  async createOpportunity(companyId: string, dto: CreateOpportunityDto) {
    const data: any = { ...dto, companyId };
    if (dto.closeDate) data.closeDate = new Date(dto.closeDate);
    return this.prisma.opportunity.create({ data });
  }

  async findAllOpportunities(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, customer: true, lead: true },
      }),
      this.prisma.opportunity.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneOpportunity(companyId: string, id: string) {
    return this.prisma.opportunity.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { company: true, customer: true, lead: true },
    });
  }

  async updateOpportunity(companyId: string, id: string, dto: UpdateOpportunityDto) {
    const data: any = { ...dto };
    if (dto.closeDate) data.closeDate = new Date(dto.closeDate);
    return this.prisma.opportunity.update({ where: { id, companyId }, data });
  }

  async removeOpportunity(companyId: string, id: string) {
    return this.prisma.opportunity.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Activities ─────────────────────────────────────────────

  async createActivity(companyId: string, dto: CreateActivityDto) {
    const data: any = { ...dto, companyId };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.activity.create({ data });
  }

  async findAllActivities(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.activity.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, lead: true },
      }),
      this.prisma.activity.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneActivity(companyId: string, id: string) {
    return this.prisma.activity.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { company: true, lead: true },
    });
  }

  async updateActivity(companyId: string, id: string, dto: UpdateActivityDto) {
    const data: any = { ...dto };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    return this.prisma.activity.update({ where: { id, companyId }, data });
  }

  async removeActivity(companyId: string, id: string) {
    return this.prisma.activity.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
