import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() dto: CreateTrackingDto) {
    return this.trackingService.create(dto);
  }

  @Get(':tripId')
  findLatest(@Param('tripId') tripId: string) {
    return this.trackingService.findLatestByTrip(tripId);
  }
}
