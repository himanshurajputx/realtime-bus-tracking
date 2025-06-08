import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() dto: CreateTripDto) {
    return this.tripService.create(dto);
  }

  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  @Get('/upcoming/:route')
  findUpcoming(@Param('route') route: string) {
    return this.tripService.findUpcomingTrips(route);
  }
}
