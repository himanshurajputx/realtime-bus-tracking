import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  providers: [SocketGateway]
})
export class SocketModule {}
