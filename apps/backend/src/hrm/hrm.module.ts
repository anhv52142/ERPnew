import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HrmService } from './services/hrm.service';
import { HrmController } from './controllers/hrm.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HrmController],
  providers: [HrmService],
  exports: [HrmService],
})
export class HrmModule {}
