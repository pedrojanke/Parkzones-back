import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 12)
  license_plate: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  model: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  color: string;
}
