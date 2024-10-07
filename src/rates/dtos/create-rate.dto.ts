import { IsDecimal, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRateDto {
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'hourly_rate must be a decimal with two decimal places' },
  )
  @IsNotEmpty({ message: 'hourly_rate is required' })
  hourly_rate: number;

  @IsString()
  @IsNotEmpty({ message: 'vehicle_type is required' })
  @Length(1, 50, {
    message: 'vehicle_type must be between 1 and 50 characters',
  })
  vehicle_type: string;

  @IsNotEmpty({ message: 'is_active is required' })
  is_active: boolean;
}
