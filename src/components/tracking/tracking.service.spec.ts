import { Test, TestingModule } from '@nestjs/testing';
import { TrackingService } from './tracking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tracking } from './entitys/tracking.entity';
import { Trip } from '../trip/entitys/trip.entity';


describe('TrackingService', () => {
  let service: TrackingService;

  const mockTrackingRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockTripRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingService,
        {
          provide: getRepositoryToken(Tracking),
          useValue: mockTrackingRepo,
        },
        {
          provide: getRepositoryToken(Trip),
          useValue: mockTripRepo,
        },
      ],
    }).compile();

    service = module.get<TrackingService>(TrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
