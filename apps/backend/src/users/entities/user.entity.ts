import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  emailVerified?: Date;

  @ApiPropertyOptional()
  image?: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  mfaEnabled?: boolean;

  @ApiPropertyOptional()
  mfaSecret?: string;

  @ApiPropertyOptional()
  lastLoginAt?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  deletedAt?: Date;
}
