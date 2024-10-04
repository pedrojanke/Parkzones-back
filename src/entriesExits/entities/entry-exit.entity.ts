import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

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
}
