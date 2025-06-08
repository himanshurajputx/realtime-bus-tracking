import { Module } from '@nestjs/common';
import { BusModule } from './bus/bus.module';
import { RouteModule } from './route/route.module';
import { HealthModule } from './health/health.module';
import { TrackingModule } from './tracking/tracking.module';
import { TripModule } from './trip/trip.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    BusModule,
    RouteModule,
    HealthModule,
    TrackingModule,
    TripModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class ComponentsModules {}
