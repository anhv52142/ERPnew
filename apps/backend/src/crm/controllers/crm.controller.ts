import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CrmService } from '../services/crm.service';

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

@Controller('crm')
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private readonly crm: CrmService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Leads ──────────────────────────────────────────────────

  @Get('leads')
  findAllLeads(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.crm.findAllLeads(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('leads/:id')
  findOneLead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.findOneLead(this.getCompanyId(user), id);
  }

  @Post('leads')
  createLead(@CurrentUser() user: any, @Body() dto: CreateLeadDto) {
    return this.crm.createLead(this.getCompanyId(user), dto);
  }

  @Put('leads/:id')
  updateLead(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.crm.updateLead(this.getCompanyId(user), id, dto);
  }

  @Delete('leads/:id')
  removeLead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.removeLead(this.getCompanyId(user), id);
  }

  // ─── Customers ──────────────────────────────────────────────

  @Get('customers')
  findAllCustomers(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.crm.findAllCustomers(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('customers/:id')
  findOneCustomer(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.findOneCustomer(this.getCompanyId(user), id);
  }

  @Post('customers')
  createCustomer(@CurrentUser() user: any, @Body() dto: CreateCustomerDto) {
    return this.crm.createCustomer(this.getCompanyId(user), dto);
  }

  @Put('customers/:id')
  updateCustomer(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.crm.updateCustomer(this.getCompanyId(user), id, dto);
  }

  @Delete('customers/:id')
  removeCustomer(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.removeCustomer(this.getCompanyId(user), id);
  }

  // ─── Contacts ───────────────────────────────────────────────

  @Get('contacts')
  findAllContacts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.crm.findAllContacts(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('contacts/:id')
  findOneContact(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.findOneContact(this.getCompanyId(user), id);
  }

  @Post('contacts')
  createContact(@CurrentUser() user: any, @Body() dto: CreateContactDto) {
    return this.crm.createContact(this.getCompanyId(user), dto);
  }

  @Put('contacts/:id')
  updateContact(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.crm.updateContact(this.getCompanyId(user), id, dto);
  }

  @Delete('contacts/:id')
  removeContact(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.removeContact(this.getCompanyId(user), id);
  }

  // ─── Opportunities ──────────────────────────────────────────

  @Get('opportunities')
  findAllOpportunities(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.crm.findAllOpportunities(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('opportunities/:id')
  findOneOpportunity(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.findOneOpportunity(this.getCompanyId(user), id);
  }

  @Post('opportunities')
  createOpportunity(@CurrentUser() user: any, @Body() dto: CreateOpportunityDto) {
    return this.crm.createOpportunity(this.getCompanyId(user), dto);
  }

  @Put('opportunities/:id')
  updateOpportunity(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateOpportunityDto) {
    return this.crm.updateOpportunity(this.getCompanyId(user), id, dto);
  }

  @Delete('opportunities/:id')
  removeOpportunity(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.removeOpportunity(this.getCompanyId(user), id);
  }

  // ─── Activities ─────────────────────────────────────────────

  @Get('activities')
  findAllActivities(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.crm.findAllActivities(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('activities/:id')
  findOneActivity(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.findOneActivity(this.getCompanyId(user), id);
  }

  @Post('activities')
  createActivity(@CurrentUser() user: any, @Body() dto: CreateActivityDto) {
    return this.crm.createActivity(this.getCompanyId(user), dto);
  }

  @Put('activities/:id')
  updateActivity(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return this.crm.updateActivity(this.getCompanyId(user), id, dto);
  }

  @Delete('activities/:id')
  removeActivity(@CurrentUser() user: any, @Param('id') id: string) {
    return this.crm.removeActivity(this.getCompanyId(user), id);
  }
}
