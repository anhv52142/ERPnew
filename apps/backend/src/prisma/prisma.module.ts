import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { forwardRef } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

module.exports = { PrismaModule };
