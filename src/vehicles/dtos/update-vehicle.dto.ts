import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @Length(1, 12)
  license_plate?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  model?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  color?: string;
}
