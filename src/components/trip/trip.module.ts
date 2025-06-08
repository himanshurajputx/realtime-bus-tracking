import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entitys/trip.entity';
import { Bus } from '../bus/entitys/bus.entity';
import { Route } from '../route/entitys/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Bus, Route])],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
