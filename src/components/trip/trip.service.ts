import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Bus } from '../bus/entitys/bus.entity';
import { Trip } from './entitys/trip.entity';
import { Route } from '../route/entitys/route.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,

    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,

    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(dto: CreateTripDto): Promise<Trip> {
    // @ts-ignore
    const bus = await this.busRepository.findOneBy({ busId: dto.busId });
    const route = await this.routeRepository.findOneBy({ routeId: dto.route });

    const trip = this.tripRepository.create({
      // @ts-ignore
      bus,
      route: route,
      startTime: dto.startTime,
      status: 'ongoing',
    });
    // @ts-ignore
    return this.tripRepository.save(trip);
  }

  findAll(): Promise<Trip[]> {
    return this.tripRepository.find({ relations: ['bus'] });
  }

  async findUpcomingTrips(route: string): Promise<Trip[]> {
    return this.tripRepository.find({
      // @ts-ignore
      where: { route, status: 'ongoing' },
      relations: ['bus'],
      order: { startTime: 'ASC' },
      take: 2,
    });
  }
}
