import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCampaignLeadDto {
  @IsString()
  @IsNotEmpty()
  campaignId: string;

  @IsString()
  @IsNotEmpty()
  leadId: string;
}
