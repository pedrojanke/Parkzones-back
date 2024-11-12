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
import { CreateRateDto } from "./dtos/create-rate.dto";
import { UpdateRateDto } from "./dtos/update-rate.dto";
import { RatesService } from "./rates-service";

@Controller("rates")
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  async create(@Body() createRateDto: CreateRateDto) {
    return this.ratesService.create(createRateDto);
  }

  @Get()
  async findAll() {
    return this.ratesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.ratesService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateRateDto: UpdateRateDto) {
    const isDuplicate = await this.ratesService.isVehicleTypeDuplicate(
      updateRateDto.vehicle_type,
      id,
    );
    if (isDuplicate) {
      throw new BadRequestException("Tipo de veículo já cadastrado.");
    }
    return this.ratesService.update(id, updateRateDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.ratesService.delete(id);
  }
}
