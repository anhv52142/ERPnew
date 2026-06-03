import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Company {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  taxId?: string;

  @ApiPropertyOptional()
  website?: string;

  @ApiPropertyOptional()
  logo?: string;

  @ApiPropertyOptional()
  primaryColor?: string;

  @ApiProperty({ default: 'free', enum: ['free', 'basic', 'pro', 'enterprise'] })
  plan: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
