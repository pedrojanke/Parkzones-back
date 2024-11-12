import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateEntryExitDto {
  @IsOptional()
  @IsString()
  vehicle_id?: string;

  @IsOptional()
  @Type(() => Date)
  entry_time?: Date;

  @IsOptional()
  @Type(() => Date)
  exit_time?: Date;

  @IsOptional()
  duration_minutes?: number;

  @IsOptional()
  charged_amount?: number;

  @IsOptional()
  is_active?: boolean;
}
