import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanningService } from './services/planning.service';
import { PlanningController } from './controllers/planning.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService],
})
export class PlanningModule {}
