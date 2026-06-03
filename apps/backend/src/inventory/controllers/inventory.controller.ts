import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { InventoryService } from '../services/inventory.service';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { CreateStockMovementDto } from '../dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from '../dto/update-stock-movement.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  private getCompanyId(user: any): string {
    return user.companyId || user.tenantId || 'default';
  }

  // ─── Categories ─────────────────────────────────────────────

  @Get('categories')
  findAllCategories(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inventory.findAllCategories(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('categories/:id')
  findOneCategory(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.findOneCategory(this.getCompanyId(user), id);
  }

  @Post('categories')
  createCategory(@CurrentUser() user: any, @Body() dto: CreateCategoryDto) {
    return this.inventory.createCategory(this.getCompanyId(user), dto);
  }

  @Put('categories/:id')
  updateCategory(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.inventory.updateCategory(this.getCompanyId(user), id, dto);
  }

  @Delete('categories/:id')
  removeCategory(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.removeCategory(this.getCompanyId(user), id);
  }

  // ─── Products ───────────────────────────────────────────────

  @Get('products')
  findAllProducts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('search') search?: string, @Query('categoryId') categoryId?: string) {
    return this.inventory.findAllProducts(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, search, categoryId);
  }

  @Get('products/:id')
  findOneProduct(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.findOneProduct(this.getCompanyId(user), id);
  }

  @Post('products')
  createProduct(@CurrentUser() user: any, @Body() dto: CreateProductDto) {
    return this.inventory.createProduct(this.getCompanyId(user), dto);
  }

  @Put('products/:id')
  updateProduct(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.inventory.updateProduct(this.getCompanyId(user), id, dto);
  }

  @Delete('products/:id')
  removeProduct(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.removeProduct(this.getCompanyId(user), id);
  }

  // ─── Warehouses ─────────────────────────────────────────────

  @Get('warehouses')
  findAllWarehouses(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inventory.findAllWarehouses(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20);
  }

  @Get('warehouses/:id')
  findOneWarehouse(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.findOneWarehouse(this.getCompanyId(user), id);
  }

  @Post('warehouses')
  createWarehouse(@CurrentUser() user: any, @Body() dto: CreateWarehouseDto) {
    return this.inventory.createWarehouse(this.getCompanyId(user), dto);
  }

  @Put('warehouses/:id')
  updateWarehouse(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.inventory.updateWarehouse(this.getCompanyId(user), id, dto);
  }

  @Delete('warehouses/:id')
  removeWarehouse(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.removeWarehouse(this.getCompanyId(user), id);
  }

  // ─── Stock Movements ────────────────────────────────────────

  @Get('stock-movements')
  findAllStockMovements(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number, @Query('productId') productId?: string, @Query('warehouseId') warehouseId?: string) {
    return this.inventory.findAllStockMovements(this.getCompanyId(user), Number(page) || 1, Number(limit) || 20, productId, warehouseId);
  }

  @Get('stock-movements/:id')
  findOneStockMovement(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.findOneStockMovement(this.getCompanyId(user), id);
  }

  @Post('stock-movements')
  createStockMovement(@CurrentUser() user: any, @Body() dto: CreateStockMovementDto) {
    return this.inventory.createStockMovement(this.getCompanyId(user), dto);
  }

  @Put('stock-movements/:id')
  updateStockMovement(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateStockMovementDto) {
    return this.inventory.updateStockMovement(this.getCompanyId(user), id, dto);
  }

  @Delete('stock-movements/:id')
  removeStockMovement(@CurrentUser() user: any, @Param('id') id: string) {
    return this.inventory.removeStockMovement(this.getCompanyId(user), id);
  }
}
