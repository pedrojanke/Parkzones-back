/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/rates/entities/rate.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesController } from './vehicles-controller';
import { VehiclesService } from './vehicles-service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Rate])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
