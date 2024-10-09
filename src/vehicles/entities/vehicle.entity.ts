/* eslint-disable prettier/prettier */
import { EntryExit } from 'src/entriesExits/entities/entry-exit.entity';
import { Rate } from 'src/rates/entities/rate.entity'; // Importe Rate
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id_vehicle: string;

  @Column({ length: 12, nullable: false })
  license_plate: string;

  @Column({ length: 256, nullable: false })
  model: string;

  @Column({ length: 256, nullable: false })
  color: string;

  @ManyToOne(() => Rate, { eager: true }) // Adiciona a relação com Rate
  rate: Rate; // Campo que referenciará a taxa

  @OneToMany(() => EntryExit, (entryExit) => entryExit.vehicle)
  entryExits: EntryExit[];
}
