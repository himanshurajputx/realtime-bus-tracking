// socket/socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from '../../tracking/tracking.service';
import { CreateTrackingDto } from '../../tracking/dto/create-tracking.dto';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly trackingService: TrackingService) {}

  @SubscribeMessage('location:update')
  async handleLocationUpdate(
    @MessageBody() data: CreateTrackingDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('📍 Location update received:', data);

    const saved = await this.trackingService.create(data);

    // Broadcast to room "trip:{tripId}" so users only get relevant updates
    this.server.to(`trip:${data.tripId}`).emit('location:broadcast', saved);
  }

  @SubscribeMessage('trip:subscribe')
  handleTripSubscription(
    @MessageBody() tripId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`trip:${tripId}`);
    console.log(`Client ${client.id} subscribed to trip:${tripId}`);
  }

  @SubscribeMessage('trip:unsubscribe')
  handleTripUnsubscription(
    @MessageBody() tripId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`trip:${tripId}`);
    console.log(`Client ${client.id} unsubscribed from trip:${tripId}`);
  }
}
