import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Trip } from '../../trip/entitys/trip.entity';

@Entity('tracking')
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  trackingId: string;

  @ManyToOne(() => Trip)
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  timestamp: Date;

  @Column({ default: 2 })
  handicapSeatsAvailable: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
