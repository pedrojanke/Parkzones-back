import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Rates')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  rate_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  hourly_rate: number;

  @Column({ length: 50, nullable: false })
  vehicle_type: string;

  @Column({ default: true })
  is_active: boolean;
}
