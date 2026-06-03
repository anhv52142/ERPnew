import { IsString, IsOptional } from 'class-validator';

export class UpdateLeaveDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  approvedById?: string;

  @IsOptional()
  @IsString()
  rejectionNote?: string;
}
