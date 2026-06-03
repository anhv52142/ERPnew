import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ReportingService } from '../services/reporting.service';

import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { CreateDashboardDto } from '../dto/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/update-dashboard.dto';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { UpdateWidgetDto } from '../dto/update-widget.dto';

@Controller('reporting')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reporting: ReportingService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Reports ────────────────────────────────────────────────

  @Get('reports')
  findAllReports(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('type') type?: string) {
    return this.reporting.findAllReports(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, type);
  }

  @Get('reports/:id')
  findOneReport(@CurrentUser() user: any, @Param('id') id: string) {
    return this.reporting.findOneReport(this.getCompanyId(user), id);
  }

  @Post('reports')
  createReport(@CurrentUser() user: any, @Body() dto: CreateReportDto) {
    return this.reporting.createReport(this.getCompanyId(user), dto);
  }

  @Put('reports/:id')
  updateReport(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reporting.updateReport(this.getCompanyId(user), id, dto);
  }

  @Delete('reports/:id')
  removeReport(@CurrentUser() user: any, @Param('id') id: string) {
    return this.reporting.removeReport(this.getCompanyId(user), id);
  }

  // ─── Dashboards ─────────────────────────────────────────────

  @Get('dashboards')
  findAllDashboards(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.reporting.findAllDashboards(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('dashboards/:id')
  findOneDashboard(@CurrentUser() user: any, @Param('id') id: string) {
    return this.reporting.findOneDashboard(this.getCompanyId(user), id);
  }

  @Post('dashboards')
  createDashboard(@CurrentUser() user: any, @Body() dto: CreateDashboardDto) {
    return this.reporting.createDashboard(this.getCompanyId(user), dto);
  }

  @Put('dashboards/:id')
  updateDashboard(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateDashboardDto) {
    return this.reporting.updateDashboard(this.getCompanyId(user), id, dto);
  }

  @Delete('dashboards/:id')
  removeDashboard(@CurrentUser() user: any, @Param('id') id: string) {
    return this.reporting.removeDashboard(this.getCompanyId(user), id);
  }

  // ─── Widgets ────────────────────────────────────────────────

  @Get('dashboards/:dashboardId/widgets')
  findAllWidgets(@Param('dashboardId') dashboardId: string) {
    return this.reporting.findAllWidgets(dashboardId);
  }

  @Get('dashboards/:dashboardId/widgets/:id')
  findOneWidget(@Param('dashboardId') dashboardId: string, @Param('id') id: string) {
    return this.reporting.findOneWidget(dashboardId, id);
  }

  @Post('dashboards/:dashboardId/widgets')
  createWidget(@Param('dashboardId') dashboardId: string, @Body() dto: CreateWidgetDto) {
    return this.reporting.createWidget('default', { ...dto, dashboardId });
  }

  @Put('dashboards/:dashboardId/widgets/:id')
  updateWidget(@Param('dashboardId') dashboardId: string, @Param('id') id: string, @Body() dto: UpdateWidgetDto) {
    return this.reporting.updateWidget(dashboardId, id, dto);
  }

  @Delete('dashboards/:dashboardId/widgets/:id')
  removeWidget(@Param('dashboardId') dashboardId: string, @Param('id') id: string) {
    return this.reporting.removeWidget(dashboardId, id);
  }
}
