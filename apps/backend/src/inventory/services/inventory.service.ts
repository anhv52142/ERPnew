import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { CreateStockMovementDto } from '../dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from '../dto/update-stock-movement.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Categories ─────────────────────────────────────────────

  async createCategory(companyId: string, dto: CreateCategoryDto) {
    return this.prisma.productCategory.create({ data: { ...dto, companyId } as any });
  }

  async findAllCategories(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.productCategory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { products: true },
      }),
      this.prisma.productCategory.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneCategory(companyId: string, id: string) {
    return this.prisma.productCategory.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { products: true },
    });
  }

  async updateCategory(companyId: string, id: string, dto: UpdateCategoryDto) {
    return this.prisma.productCategory.update({ where: { id, companyId }, data: dto as any });
  }

  async removeCategory(companyId: string, id: string) {
    return this.prisma.productCategory.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Products ───────────────────────────────────────────────

  async createProduct(companyId: string, dto: CreateProductDto) {
    return this.prisma.product.create({ data: { ...dto, companyId } as any });
  }

  async findAllProducts(companyId: string, page = 1, limit = 20, search?: string, categoryId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (categoryId) where.categoryId = categoryId;
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneProduct(companyId: string, id: string) {
    return this.prisma.product.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { category: true, stockMovements: true },
    });
  }

  async updateProduct(companyId: string, id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({ where: { id, companyId }, data: dto as any });
  }

  async removeProduct(companyId: string, id: string) {
    return this.prisma.product.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Warehouses ─────────────────────────────────────────────

  async createWarehouse(companyId: string, dto: CreateWarehouseDto) {
    return this.prisma.warehouse.create({ data: { ...dto, companyId } as any });
  }

  async findAllWarehouses(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { companyId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.warehouse.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { branch: true },
      }),
      this.prisma.warehouse.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneWarehouse(companyId: string, id: string) {
    return this.prisma.warehouse.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { branch: true },
    });
  }

  async updateWarehouse(companyId: string, id: string, dto: UpdateWarehouseDto) {
    return this.prisma.warehouse.update({ where: { id, companyId }, data: dto as any });
  }

  async removeWarehouse(companyId: string, id: string) {
    return this.prisma.warehouse.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }

  // ─── Stock Movements ────────────────────────────────────────

  async createStockMovement(companyId: string, dto: CreateStockMovementDto) {
    return this.prisma.stockMovement.create({ data: { ...dto, companyId } as any });
  }

  async findAllStockMovements(companyId: string, page = 1, limit = 20, productId?: string, warehouseId?: string) {
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (productId) where.productId = productId;
    if (warehouseId) where.warehouseId = warehouseId;
    const [items, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { product: true, warehouse: true },
      }),
      this.prisma.stockMovement.count({ where }),
    ]);
    return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneStockMovement(companyId: string, id: string) {
    return this.prisma.stockMovement.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { product: true, warehouse: true },
    });
  }

  async updateStockMovement(companyId: string, id: string, dto: UpdateStockMovementDto) {
    return this.prisma.stockMovement.update({ where: { id, companyId }, data: dto as any });
  }

  async removeStockMovement(companyId: string, id: string) {
    return this.prisma.stockMovement.update({ where: { id, companyId }, data: { deletedAt: new Date() } });
  }
}
