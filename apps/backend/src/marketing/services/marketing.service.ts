import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CreateLeadSourceDto } from '../dto/create-lead-source.dto';
import { UpdateLeadSourceDto } from '../dto/update-lead-source.dto';
import { CreateEmailDto } from '../dto/create-email.dto';
import { UpdateEmailDto } from '../dto/update-email.dto';
import { CreateCampaignLeadDto } from '../dto/create-campaign-lead.dto';

@Injectable()
export class MarketingService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Campaigns ──────────────────────────────────────────────

  async createCampaign(companyId: string, dto: CreateCampaignDto) {
    const data: any = { ...dto, companyId };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.campaign.create({ data });
  }

  async findAllCampaigns(companyId: string, page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { createdBy: true, leads: true },
      }),
      this.prisma.campaign.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneCampaign(companyId: string, id: string) {
    return this.prisma.campaign.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { createdBy: true, leads: { include: { lead: true } }, emails: true },
    });
  }

  async updateCampaign(companyId: string, id: string, dto: UpdateCampaignDto) {
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.campaign.update({ where: { id, companyId }, data });
  }

  async removeCampaign(companyId: string, id: string) {
    return this.prisma.campaign.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Campaign Leads ─────────────────────────────────────────

  async addLeadToCampaign(companyId: string, dto: CreateCampaignLeadDto) {
    return this.prisma.campaignLead.create({ data: dto as any });
  }

  async removeLeadFromCampaign(campaignId: string, leadId: string) {
    return this.prisma.campaignLead.deleteMany({ where: { campaignId, leadId } });
  }

  async findCampaignLeads(campaignId: string) {
    return this.prisma.campaignLead.findMany({
      where: { campaignId },
      include: { lead: true },
    });
  }

  // ─── Lead Sources ───────────────────────────────────────────

  async createLeadSource(companyId: string, dto: CreateLeadSourceDto) {
    return this.prisma.leadSource.create({ data: { ...dto, companyId } as any });
  }

  async findAllLeadSources(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.leadSource.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.leadSource.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneLeadSource(companyId: string, id: string) {
    return this.prisma.leadSource.findFirst({ where: { id, companyId, deletedAt: null } });
  }

  async updateLeadSource(companyId: string, id: string, dto: UpdateLeadSourceDto) {
    return this.prisma.leadSource.update({ where: { id, companyId }, data: dto as any });
  }

  async removeLeadSource(companyId: string, id: string) {
    return this.prisma.leadSource.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Emails ─────────────────────────────────────────────────

  async createEmail(companyId: string, dto: CreateEmailDto) {
    return this.prisma.email.create({ data: { ...dto, companyId } as any });
  }

  async findAllEmails(companyId: string, page = 1, limit = 20, campaignId?: string, leadId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (campaignId) where.campaignId = campaignId;
    if (leadId) where.leadId = leadId;
    const [items, total] = await Promise.all([
      this.prisma.email.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { campaign: true, lead: true },
      }),
      this.prisma.email.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneEmail(companyId: string, id: string) {
    return this.prisma.email.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { campaign: true, lead: true },
    });
  }

  async updateEmail(companyId: string, id: string, dto: UpdateEmailDto) {
    return this.prisma.email.update({ where: { id, companyId }, data: dto as any });
  }

  async removeEmail(companyId: string, id: string) {
    return this.prisma.email.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
