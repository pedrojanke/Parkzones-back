import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { UpdateVehicleDto } from "./dtos/update-vehicle.dto";
import { VehiclesService } from "./vehicles-service";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    const isDuplicate = await this.vehiclesService.isLicensePlateDuplicate(
      updateVehicleDto.license_plate,
      id,
    );
    if (isDuplicate) {
      throw new BadRequestException("Placa de veículo já cadastrada.");
    }
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.vehiclesService.delete(id);
  }
}
