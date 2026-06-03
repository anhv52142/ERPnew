import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeadSourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
