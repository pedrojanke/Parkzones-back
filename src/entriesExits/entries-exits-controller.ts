import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEntryExitDto } from './dtos/create-entry-exit.dto';
import { UpdateEntryExitDto } from './dtos/update-entry-exit.dto';
import { EntryExit } from './entities/entry-exit.entity';
import { EntriesExitsService } from './entries-exits-service';

@Controller('entries-exits')
export class EntriesExitsController {
  constructor(private readonly entriesExitsService: EntriesExitsService) {}

  @Post()
  async create(
    @Body() createEntryExitDto: CreateEntryExitDto,
  ): Promise<EntryExit> {
    return this.entriesExitsService.create(createEntryExitDto);
  }

  @Get()
  async findAll(): Promise<EntryExit[]> {
    return this.entriesExitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EntryExit> {
    return this.entriesExitsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEntryExitDto: UpdateEntryExitDto,
  ): Promise<EntryExit> {
    return this.entriesExitsService.update(id, updateEntryExitDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.entriesExitsService.delete(id);
  }

  @Get('active/:plate') // http://localhost:3000/entries-exits/active/(placa do carro), após fazer o GET vai puxar e atrelar o horário que foi feito o GET (exit_time) e calcular o valor.
  async findActiveVehicleByPlate(@Param('plate') plate: string): Promise<any> {
    const vehicleEntry =
      await this.entriesExitsService.findActiveByPlate(plate);

    if (!vehicleEntry) {
      throw new NotFoundException(
        `Veículo com a placa ${plate} não encontrado ou já foi pago.`,
      );
    }

    // Captura o horário de saída automaticamente
    const exit_time = new Date();
    vehicleEntry.exit_time = exit_time;

    vehicleEntry.duration_minutes = this.entriesExitsService.calculateDuration(
      vehicleEntry.entry_time,
      exit_time,
    );

    vehicleEntry.charged_amount =
      this.entriesExitsService.calculateChargedAmount(
        vehicleEntry.entry_time,
        exit_time,
      );

    // Atualiza o registro e retorna o valor
    await this.entriesExitsService.update(
      vehicleEntry.id_movement,
      vehicleEntry,
    );

    return { valorTotal: vehicleEntry.charged_amount };
  }
}
