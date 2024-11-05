import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRateDto } from "./dtos/create-rate.dto";
import { UpdateRateDto } from "./dtos/update-rate.dto";
import { Rate } from "./entities/rate.entity";

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async create(createRateDto: CreateRateDto): Promise<Rate> {
    const existingRate = await this.rateRepository.findOne({
      where: { vehicle_type: createRateDto.vehicle_type },
    });

    if (existingRate) {
      throw new ConflictException(
        `Vehicle type ${createRateDto.vehicle_type} already exists.`,
      );
    };

    const rate = this.rateRepository.create(createRateDto);
    return this.rateRepository.save(rate);
  }

  async findAll(): Promise<Rate[]> {
    return this.rateRepository.find();
  }

  async findOne(id: string): Promise<Rate> {
    const rate = await this.rateRepository.findOne({ where: { rate_id: id } });
    if (!rate) {
      throw new NotFoundException(`Rate with ID ${id} not found`);
    }
    return rate;
  }

  async update(id: string, updateRateDto: UpdateRateDto): Promise<Rate> {
    const rate = await this.findOne(id);
    Object.assign(rate, updateRateDto);
    return this.rateRepository.save(rate);
  }

  async delete(id: string): Promise<void> {
    const result = await this.rateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rate with ID ${id} not found`);
    }
  }
}
