import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmailDto {
  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsString()
  leadId?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsOptional()
  @IsString()
  status?: string;
}
