import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SalesService } from '../services/sales.service';

import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';
import { CreateSalesOrderDto } from '../dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from '../dto/update-sales-order.dto';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private readonly sales: SalesService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Quotations ─────────────────────────────────────────────

  @Get('quotations')
  findAllQuotations(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: string) {
    return this.sales.findAllQuotations(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, status);
  }

  @Get('quotations/:id')
  findOneQuotation(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.findOneQuotation(this.getCompanyId(user), id);
  }

  @Post('quotations')
  createQuotation(@CurrentUser() user: any, @Body() dto: CreateQuotationDto) {
    return this.sales.createQuotation(this.getCompanyId(user), dto);
  }

  @Put('quotations/:id')
  updateQuotation(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateQuotationDto) {
    return this.sales.updateQuotation(this.getCompanyId(user), id, dto);
  }

  @Delete('quotations/:id')
  removeQuotation(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.removeQuotation(this.getCompanyId(user), id);
  }

  // ─── Sales Orders ───────────────────────────────────────────

  @Get('orders')
  findAllSalesOrders(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: string) {
    return this.sales.findAllSalesOrders(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, status);
  }

  @Get('orders/:id')
  findOneSalesOrder(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.findOneSalesOrder(this.getCompanyId(user), id);
  }

  @Post('orders')
  createSalesOrder(@CurrentUser() user: any, @Body() dto: CreateSalesOrderDto) {
    return this.sales.createSalesOrder(this.getCompanyId(user), dto);
  }

  @Put('orders/:id')
  updateSalesOrder(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateSalesOrderDto) {
    return this.sales.updateSalesOrder(this.getCompanyId(user), id, dto);
  }

  @Delete('orders/:id')
  removeSalesOrder(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.removeSalesOrder(this.getCompanyId(user), id);
  }

  // ─── Invoices ───────────────────────────────────────────────

  @Get('invoices')
  findAllInvoices(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: string) {
    return this.sales.findAllInvoices(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, status);
  }

  @Get('invoices/:id')
  findOneInvoice(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.findOneInvoice(this.getCompanyId(user), id);
  }

  @Post('invoices')
  createInvoice(@CurrentUser() user: any, @Body() dto: CreateInvoiceDto) {
    return this.sales.createInvoice(this.getCompanyId(user), dto);
  }

  @Put('invoices/:id')
  updateInvoice(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.sales.updateInvoice(this.getCompanyId(user), id, dto);
  }

  @Delete('invoices/:id')
  removeInvoice(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.removeInvoice(this.getCompanyId(user), id);
  }

  // ─── Payments ───────────────────────────────────────────────

  @Get('payments')
  findAllPayments(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('invoiceId') invoiceId?: string) {
    return this.sales.findAllPayments(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, invoiceId);
  }

  @Get('payments/:id')
  findOnePayment(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.findOnePayment(this.getCompanyId(user), id);
  }

  @Post('payments')
  createPayment(@CurrentUser() user: any, @Body() dto: CreatePaymentDto) {
    return this.sales.createPayment(this.getCompanyId(user), dto);
  }

  @Put('payments/:id')
  updatePayment(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.sales.updatePayment(this.getCompanyId(user), id, dto);
  }

  @Delete('payments/:id')
  removePayment(@CurrentUser() user: any, @Param('id') id: string) {
    return this.sales.removePayment(this.getCompanyId(user), id);
  }
}
