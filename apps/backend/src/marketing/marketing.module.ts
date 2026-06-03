import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MarketingService } from './services/marketing.service';
import { MarketingController } from './controllers/marketing.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MarketingController],
  providers: [MarketingService],
  exports: [MarketingService],
})
export class MarketingModule {}
