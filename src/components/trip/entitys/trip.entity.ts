import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bus } from '../../bus/entitys/bus.entity';
import { Route } from '../../route/entitys/route.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  tripId: string;

  @ManyToOne(() => Bus)
  @JoinColumn({ name: 'busId' })
  bus: Bus;

  @ManyToOne(() => Route)
  @JoinColumn({ name: 'routeId' })
  route: Route;

  @Column()
  startTime: Date;

  @Column({ default: 'ongoing' })
  status: 'ongoing' | 'completed';

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
