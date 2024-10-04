import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { EntryExit } from './entities/entry-exit.entity';
import { EntriesExitsController } from './entries-exits-controller';
import { EntriesExitsService } from './entries-exits-service';

@Module({
  imports: [TypeOrmModule.forFeature([EntryExit, Vehicle])],
  controllers: [EntriesExitsController],
  providers: [EntriesExitsService],
  exports: [EntriesExitsService],
})
export class EntriesExitsModule {}
