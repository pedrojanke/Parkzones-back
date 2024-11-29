/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryExit } from './entriesExits/entities/entry-exit.entity';
import { EntriesExitsModule } from './entriesExits/entries-exits-module';
import { Rate } from './rates/entities/rate.entity';
import { RatesModule } from './rates/rates-module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users-module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { VehiclesModule } from './vehicles/vehicles-module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      url: process.env.DATABASE_URL,
      entities: [Rate, User, EntryExit, Vehicle],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    VehiclesModule,
    EntriesExitsModule,
    UsersModule,
    RatesModule,
  ],
})
export class AppModule {}
