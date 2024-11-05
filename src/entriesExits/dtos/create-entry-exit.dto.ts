import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEntryExitDto {
  @IsNotEmpty()
  @IsString()
  vehicle_id: string;

  @IsNotEmpty()
  @Type(() => Date)
  entry_time: Date;

  @IsOptional()
  @Type(() => Date)
  exit_time?: Date;

  @IsOptional()
  duration_minutes?: number;

  @IsOptional()
  charged_amount?: number;
}
