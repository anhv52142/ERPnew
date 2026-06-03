import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { MarketingService } from '../services/marketing.service';

import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CreateLeadSourceDto } from '../dto/create-lead-source.dto';
import { UpdateLeadSourceDto } from '../dto/update-lead-source.dto';
import { CreateEmailDto } from '../dto/create-email.dto';
import { UpdateEmailDto } from '../dto/update-email.dto';
import { CreateCampaignLeadDto } from '../dto/create-campaign-lead.dto';

@Controller('marketing')
@UseGuards(JwtAuthGuard)
export class MarketingController {
  constructor(private readonly marketing: MarketingService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Campaigns ──────────────────────────────────────────────

  @Get('campaigns')
  findAllCampaigns(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: string) {
    return this.marketing.findAllCampaigns(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, status);
  }

  @Get('campaigns/:id')
  findOneCampaign(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.findOneCampaign(this.getCompanyId(user), id);
  }

  @Post('campaigns')
  createCampaign(@CurrentUser() user: any, @Body() dto: CreateCampaignDto) {
    return this.marketing.createCampaign(this.getCompanyId(user), dto);
  }

  @Put('campaigns/:id')
  updateCampaign(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.marketing.updateCampaign(this.getCompanyId(user), id, dto);
  }

  @Delete('campaigns/:id')
  removeCampaign(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.removeCampaign(this.getCompanyId(user), id);
  }

  // ─── Campaign Leads ─────────────────────────────────────────

  @Get('campaigns/:id/leads')
  findCampaignLeads(@Param('id') id: string) {
    return this.marketing.findCampaignLeads(id);
  }

  @Post('campaign-leads')
  addLeadToCampaign(@Body() dto: CreateCampaignLeadDto) {
    return this.marketing.addLeadToCampaign('default', dto);
  }

  @Delete('campaigns/:campaignId/leads/:leadId')
  removeLeadFromCampaign(@Param('campaignId') campaignId: string, @Param('leadId') leadId: string) {
    return this.marketing.removeLeadFromCampaign(campaignId, leadId);
  }

  // ─── Lead Sources ───────────────────────────────────────────

  @Get('lead-sources')
  findAllLeadSources(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.marketing.findAllLeadSources(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('lead-sources/:id')
  findOneLeadSource(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.findOneLeadSource(this.getCompanyId(user), id);
  }

  @Post('lead-sources')
  createLeadSource(@CurrentUser() user: any, @Body() dto: CreateLeadSourceDto) {
    return this.marketing.createLeadSource(this.getCompanyId(user), dto);
  }

  @Put('lead-sources/:id')
  updateLeadSource(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateLeadSourceDto) {
    return this.marketing.updateLeadSource(this.getCompanyId(user), id, dto);
  }

  @Delete('lead-sources/:id')
  removeLeadSource(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.removeLeadSource(this.getCompanyId(user), id);
  }

  // ─── Emails ─────────────────────────────────────────────────

  @Get('emails')
  findAllEmails(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('campaignId') campaignId?: string, @Query('leadId') leadId?: string) {
    return this.marketing.findAllEmails(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, campaignId, leadId);
  }

  @Get('emails/:id')
  findOneEmail(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.findOneEmail(this.getCompanyId(user), id);
  }

  @Post('emails')
  createEmail(@CurrentUser() user: any, @Body() dto: CreateEmailDto) {
    return this.marketing.createEmail(this.getCompanyId(user), dto);
  }

  @Put('emails/:id')
  updateEmail(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateEmailDto) {
    return this.marketing.updateEmail(this.getCompanyId(user), id, dto);
  }

  @Delete('emails/:id')
  removeEmail(@CurrentUser() user: any, @Param('id') id: string) {
    return this.marketing.removeEmail(this.getCompanyId(user), id);
  }
}
