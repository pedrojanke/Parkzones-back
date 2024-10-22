/* eslint-disable prettier/prettier */
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EntryExit')
export class EntryExit {
  @PrimaryGeneratedColumn('uuid')
  id_movement: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.entryExits, { eager: true })
  vehicle: Vehicle;

  @Column({ type: 'timestamp', nullable: false })
  entry_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  exit_time: Date;

  @Column({ type: 'int', nullable: true })
  duration_minutes: number;

  @Column({ type: 'decimal', nullable: true })
  charged_amount: number;

  @Column({ type: 'text', nullable: true }) 
  qr_code: string;
  
  @Column({ default: true })
  is_active: boolean;
}
