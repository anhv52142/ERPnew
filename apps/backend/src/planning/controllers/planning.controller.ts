import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PlanningService } from '../services/planning.service';

import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { CreateMilestoneDto } from '../dto/create-milestone.dto';
import { UpdateMilestoneDto } from '../dto/update-milestone.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';

@Controller('planning')
@UseGuards(JwtAuthGuard)
export class PlanningController {
  constructor(private readonly planning: PlanningService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Projects ───────────────────────────────────────────────

  @Get('projects')
  findAllProjects(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: string) {
    return this.planning.findAllProjects(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, status);
  }

  @Get('projects/:id')
  findOneProject(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.findOneProject(this.getCompanyId(user), id);
  }

  @Post('projects')
  createProject(@CurrentUser() user: any, @Body() dto: CreateProjectDto) {
    return this.planning.createProject(this.getCompanyId(user), dto);
  }

  @Put('projects/:id')
  updateProject(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.planning.updateProject(this.getCompanyId(user), id, dto);
  }

  @Delete('projects/:id')
  removeProject(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.removeProject(this.getCompanyId(user), id);
  }

  // ─── Milestones ─────────────────────────────────────────────

  @Get('milestones')
  findAllMilestones(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('projectId') projectId?: string) {
    return this.planning.findAllMilestones(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, projectId);
  }

  @Get('milestones/:id')
  findOneMilestone(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.findOneMilestone(this.getCompanyId(user), id);
  }

  @Post('milestones')
  createMilestone(@CurrentUser() user: any, @Body() dto: CreateMilestoneDto) {
    return this.planning.createMilestone(this.getCompanyId(user), dto);
  }

  @Put('milestones/:id')
  updateMilestone(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateMilestoneDto) {
    return this.planning.updateMilestone(this.getCompanyId(user), id, dto);
  }

  @Delete('milestones/:id')
  removeMilestone(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.removeMilestone(this.getCompanyId(user), id);
  }

  // ─── Tasks ──────────────────────────────────────────────────

  @Get('tasks')
  findAllTasks(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('projectId') projectId?: string, @Query('assigneeId') assigneeId?: string, @Query('status') status?: string) {
    return this.planning.findAllTasks(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, projectId, assigneeId, status);
  }

  @Get('tasks/:id')
  findOneTask(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.findOneTask(this.getCompanyId(user), id);
  }

  @Post('tasks')
  createTask(@CurrentUser() user: any, @Body() dto: CreateTaskDto) {
    return this.planning.createTask(this.getCompanyId(user), dto);
  }

  @Put('tasks/:id')
  updateTask(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.planning.updateTask(this.getCompanyId(user), id, dto);
  }

  @Delete('tasks/:id')
  removeTask(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.removeTask(this.getCompanyId(user), id);
  }

  // ─── Resources ──────────────────────────────────────────────

  @Get('resources')
  findAllResources(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('type') type?: string) {
    return this.planning.findAllResources(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, type);
  }

  @Get('resources/:id')
  findOneResource(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.findOneResource(this.getCompanyId(user), id);
  }

  @Post('resources')
  createResource(@CurrentUser() user: any, @Body() dto: CreateResourceDto) {
    return this.planning.createResource(this.getCompanyId(user), dto);
  }

  @Put('resources/:id')
  updateResource(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.planning.updateResource(this.getCompanyId(user), id, dto);
  }

  @Delete('resources/:id')
  removeResource(@CurrentUser() user: any, @Param('id') id: string) {
    return this.planning.removeResource(this.getCompanyId(user), id);
  }
}
