import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportingService } from './services/reporting.service';
import { ReportingController } from './controllers/reporting.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReportingController],
  providers: [ReportingService],
  exports: [ReportingService],
})
export class ReportingModule {}
