import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntriesExitsService } from './entries-exits-service';
import { CreateEntryExitDto } from './dtos/create-entry-exit.dto';
import { UpdateEntryExitDto } from './dtos/update-entry-exit.dto';
import { EntryExit } from './entities/entry-exit.entity';

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
}
