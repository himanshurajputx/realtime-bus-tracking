import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Tracking } from './entitys/tracking.entity';
import { Trip } from '../trip/entitys/trip.entity';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,

    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async create(dto: CreateTrackingDto): Promise<any> {
    // @ts-ignore
    const trip = await this.tripRepository.findOneBy({ tripId: dto.tripId });
    // @ts-ignore
    const tracking = this.trackingRepository.create({ ...dto, trip });
    return this.trackingRepository.save(tracking);
  }

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async findLatestByTrip(tripId: string): Promise<any | null> {

    return this.trackingRepository.findOne({
      // @ts-ignore
      where: { tripId:  tripId  },
      order: { timestamp: 'DESC' },
    });
  }
}
