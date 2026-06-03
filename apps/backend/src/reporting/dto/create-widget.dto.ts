import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  @IsNotEmpty()
  dashboardId: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  config: any;

  @IsNotEmpty()
  position: any;
}
