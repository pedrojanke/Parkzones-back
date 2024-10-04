import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id_vehicle: number;

  @Column({ length: 12, nullable: false })
  license_plate: string;

  @Column({ length: 256, nullable: false })
  model: string;

  @Column({ length: 256, nullable: false })
  color: string;
}
