import { EntryExit } from 'src/entriesExits/entities/entry-exit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => EntryExit, (entryExit) => entryExit.vehicle)
  entryExits: EntryExit[];
}
