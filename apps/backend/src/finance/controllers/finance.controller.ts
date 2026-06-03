import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FinanceService } from '../services/finance.service';

import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { CreateTaxDto } from '../dto/create-tax.dto';
import { UpdateTaxDto } from '../dto/update-tax.dto';

@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly finance: FinanceService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Chart of Accounts ──────────────────────────────────────

  @Get('accounts')
  findAllAccounts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('type') type?: string) {
    return this.finance.findAllAccounts(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, type);
  }

  @Get('accounts/:id')
  findOneAccount(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.findOneAccount(this.getCompanyId(user), id);
  }

  @Post('accounts')
  createAccount(@CurrentUser() user: any, @Body() dto: CreateAccountDto) {
    return this.finance.createAccount(this.getCompanyId(user), dto);
  }

  @Put('accounts/:id')
  updateAccount(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.finance.updateAccount(this.getCompanyId(user), id, dto);
  }

  @Delete('accounts/:id')
  removeAccount(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.removeAccount(this.getCompanyId(user), id);
  }

  // ─── Bank Accounts ──────────────────────────────────────────

  @Get('bank-accounts')
  findAllBankAccounts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.finance.findAllBankAccounts(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('bank-accounts/:id')
  findOneBankAccount(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.findOneBankAccount(this.getCompanyId(user), id);
  }

  @Post('bank-accounts')
  createBankAccount(@CurrentUser() user: any, @Body() dto: CreateBankAccountDto) {
    return this.finance.createBankAccount(this.getCompanyId(user), dto);
  }

  @Put('bank-accounts/:id')
  updateBankAccount(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateBankAccountDto) {
    return this.finance.updateBankAccount(this.getCompanyId(user), id, dto);
  }

  @Delete('bank-accounts/:id')
  removeBankAccount(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.removeBankAccount(this.getCompanyId(user), id);
  }

  // ─── Expenses ───────────────────────────────────────────────

  @Get('expenses')
  findAllExpenses(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('category') category?: string) {
    return this.finance.findAllExpenses(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, category);
  }

  @Get('expenses/:id')
  findOneExpense(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.findOneExpense(this.getCompanyId(user), id);
  }

  @Post('expenses')
  createExpense(@CurrentUser() user: any, @Body() dto: CreateExpenseDto) {
    return this.finance.createExpense(this.getCompanyId(user), dto);
  }

  @Put('expenses/:id')
  updateExpense(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.finance.updateExpense(this.getCompanyId(user), id, dto);
  }

  @Delete('expenses/:id')
  removeExpense(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.removeExpense(this.getCompanyId(user), id);
  }

  // ─── Taxes ──────────────────────────────────────────────────

  @Get('taxes')
  findAllTaxes(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.finance.findAllTaxes(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('taxes/:id')
  findOneTax(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.findOneTax(this.getCompanyId(user), id);
  }

  @Post('taxes')
  createTax(@CurrentUser() user: any, @Body() dto: CreateTaxDto) {
    return this.finance.createTax(this.getCompanyId(user), dto);
  }

  @Put('taxes/:id')
  updateTax(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateTaxDto) {
    return this.finance.updateTax(this.getCompanyId(user), id, dto);
  }

  @Delete('taxes/:id')
  removeTax(@CurrentUser() user: any, @Param('id') id: string) {
    return this.finance.removeTax(this.getCompanyId(user), id);
  }
}
