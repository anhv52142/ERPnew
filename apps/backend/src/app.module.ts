import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HrmModule } from './hrm/hrm.module';
import { CrmModule } from './crm/crm.module';
import { InventoryModule } from './inventory/inventory.module';
import { FinanceModule } from './finance/finance.module';
import { SalesModule } from './sales/sales.module';
import { MarketingModule } from './marketing/marketing.module';
import { ReportingModule } from './reporting/reporting.module';
import { PlanningModule } from './planning/planning.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PaginationInterceptor } from './common/interceptors/pagination.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    HrmModule,
    CrmModule,
    InventoryModule,
    FinanceModule,
    SalesModule,
    MarketingModule,
    ReportingModule,
    PlanningModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },
  ],
})
export class AppModule {}
