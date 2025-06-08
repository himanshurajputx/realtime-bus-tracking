import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('bus')
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  busId: string;

  @Column()
  numberPlate: string;

  @Column()
  operatorName: string;

  @Column({ default: 2 })
  handicapSeatsTotal: number;

  @Column({ default: 2 })
  handicapSeatsAvailable: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
