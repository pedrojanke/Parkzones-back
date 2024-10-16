/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from 'src/rates/entities/rate.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    if (!createVehicleDto.rate_id) {
      throw new NotFoundException('Rate ID is required.');
    }

    const rate = await this.rateRepository.findOne({
      where: { rate_id: createVehicleDto.rate_id },
    });
  
    if (!rate) {
      throw new NotFoundException(`Rate with ID ${createVehicleDto.rate_id} not found`);
    }
  
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      rate,
    });
  
    return this.vehicleRepository.save(vehicle);
  }
  

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id_vehicle: id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(
  id: string,
  updateVehicleDto: UpdateVehicleDto,
): Promise<Vehicle> {
  const vehicle = await this.findOne(id);

  if (updateVehicleDto.rate_id) {
    const rate = await this.rateRepository.findOne({
      where: { rate_id: updateVehicleDto.rate_id },
    });

    if (!rate) {
      throw new NotFoundException(`Rate with ID ${updateVehicleDto.rate_id} not found`);
    }

    vehicle.rate = rate;
  } else {
    throw new NotFoundException('Rate ID is required.');
  }

  Object.assign(vehicle, updateVehicleDto);
  return this.vehicleRepository.save(vehicle);
}

  async delete(id: string): Promise<void> {
    const result = await this.vehicleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
