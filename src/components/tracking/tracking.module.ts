import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracking } from './entitys/tracking.entity';
import { Trip } from '../trip/entitys/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking, Trip])],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
