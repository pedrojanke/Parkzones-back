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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@1@senac2021',
      database: 'parkzones',
      entities: [Rate, User, EntryExit, Vehicle],
      synchronize: true,
    }),
    VehiclesModule,
    EntriesExitsModule,
    UsersModule,
    RatesModule,
  ],
})
export class AppModule {}
