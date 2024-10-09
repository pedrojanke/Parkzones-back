/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  rate_id: string; // Adicione o campo para o ID da taxa
}
