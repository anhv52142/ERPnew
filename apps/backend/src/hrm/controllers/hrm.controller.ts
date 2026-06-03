import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HrmService } from '../services/hrm.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

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

@Controller('hrm')
@UseGuards(JwtAuthGuard)
export class HrmController {
  constructor(private readonly hrm: HrmService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Departments ───────────────────────────────────────────

  @Get('departments')
  findAllDepartments(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.hrm.findAllDepartments(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('departments/:id')
  findOneDepartment(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOneDepartment(this.getCompanyId(user), id);
  }

  @Post('departments')
  createDepartment(@CurrentUser() user: any, @Body() dto: CreateDepartmentDto) {
    return this.hrm.createDepartment(this.getCompanyId(user), dto);
  }

  @Put('departments/:id')
  updateDepartment(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.hrm.updateDepartment(this.getCompanyId(user), id, dto);
  }

  @Delete('departments/:id')
  removeDepartment(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removeDepartment(this.getCompanyId(user), id);
  }

  // ─── Positions ─────────────────────────────────────────────

  @Get('positions')
  findAllPositions(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.hrm.findAllPositions(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('positions/:id')
  findOnePosition(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOnePosition(this.getCompanyId(user), id);
  }

  @Post('positions')
  createPosition(@CurrentUser() user: any, @Body() dto: CreatePositionDto) {
    return this.hrm.createPosition(this.getCompanyId(user), dto);
  }

  @Put('positions/:id')
  updatePosition(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdatePositionDto) {
    return this.hrm.updatePosition(this.getCompanyId(user), id, dto);
  }

  @Delete('positions/:id')
  removePosition(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removePosition(this.getCompanyId(user), id);
  }

  // ─── Employees ─────────────────────────────────────────────

  @Get('employees')
  findAllEmployees(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('search') search?: string) {
    return this.hrm.findAllEmployees(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, search);
  }

  @Get('employees/:id')
  findOneEmployee(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOneEmployee(this.getCompanyId(user), id);
  }

  @Post('employees')
  createEmployee(@CurrentUser() user: any, @Body() dto: CreateEmployeeDto) {
    return this.hrm.createEmployee(this.getCompanyId(user), dto);
  }

  @Put('employees/:id')
  updateEmployee(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.hrm.updateEmployee(this.getCompanyId(user), id, dto);
  }

  @Delete('employees/:id')
  removeEmployee(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removeEmployee(this.getCompanyId(user), id);
  }

  // ─── Attendance ────────────────────────────────────────────

  @Get('attendances')
  findAllAttendances(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('employeeId') employeeId?: string) {
    return this.hrm.findAllAttendances(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, employeeId);
  }

  @Get('attendances/:id')
  findOneAttendance(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOneAttendance(this.getCompanyId(user), id);
  }

  @Post('attendances')
  createAttendance(@CurrentUser() user: any, @Body() dto: CreateAttendanceDto) {
    return this.hrm.createAttendance(this.getCompanyId(user), dto);
  }

  @Put('attendances/:id')
  updateAttendance(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.hrm.updateAttendance(this.getCompanyId(user), id, dto);
  }

  @Delete('attendances/:id')
  removeAttendance(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removeAttendance(this.getCompanyId(user), id);
  }

  // ─── Leave ─────────────────────────────────────────────────

  @Get('leaves')
  findAllLeaves(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('employeeId') employeeId?: string, @Query('status') status?: string) {
    return this.hrm.findAllLeaves(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, employeeId, status);
  }

  @Get('leaves/:id')
  findOneLeave(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOneLeave(this.getCompanyId(user), id);
  }

  @Post('leaves')
  createLeave(@CurrentUser() user: any, @Body() dto: CreateLeaveDto) {
    return this.hrm.createLeave(this.getCompanyId(user), dto);
  }

  @Put('leaves/:id')
  updateLeave(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateLeaveDto) {
    return this.hrm.updateLeave(this.getCompanyId(user), id, dto);
  }

  @Delete('leaves/:id')
  removeLeave(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removeLeave(this.getCompanyId(user), id);
  }

  // ─── Contracts ─────────────────────────────────────────────

  @Get('contracts')
  findAllContracts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('employeeId') employeeId?: string) {
    return this.hrm.findAllContracts(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, employeeId);
  }

  @Get('contracts/:id')
  findOneContract(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.findOneContract(this.getCompanyId(user), id);
  }

  @Post('contracts')
  createContract(@CurrentUser() user: any, @Body() dto: CreateContractDto) {
    return this.hrm.createContract(this.getCompanyId(user), dto);
  }

  @Put('contracts/:id')
  updateContract(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateContractDto) {
    return this.hrm.updateContract(this.getCompanyId(user), id, dto);
  }

  @Delete('contracts/:id')
  removeContract(@CurrentUser() user: any, @Param('id') id: string) {
    return this.hrm.removeContract(this.getCompanyId(user), id);
  }
}
