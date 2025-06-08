import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

describe('TripController', () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findUpcomingTrips: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: mockTripService,
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
