import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from './entitys/trip.entity';
import { Bus } from '../bus/entitys/bus.entity';
import { Route } from '../route/entitys/route.entity';

const mockTrip = {
  id: 'e97827e0-dfc0-4f13-bd60-f3e5ddd1739a',
  route: 'R1',
  startTime: new Date(),
  status: 'ongoing',
  bus: {
    id: 'fe1e5aae-93d1-4e5b-a8f9-b7fb6e3faaf4',
    numberPlate: 'DL01AB1234',
  },
};
const routeRepo = {
  findOneBy: jest.fn().mockResolvedValue({
    id: 'fe1e5aae-93d1-4e5b-a8f9-b7fb6e3faaf4',
    name: 'R1',
    origin: 'A',
    destination: 'B',
  }),
};
describe('TripService', () => {
  let service: TripService;

  const tripRepo = {
    create: jest.fn().mockReturnValue(mockTrip),
    save: jest.fn().mockResolvedValue(mockTrip),
    find: jest.fn().mockResolvedValue([mockTrip]),
  };

  const busRepo = {
    findOneBy: jest.fn().mockResolvedValue(mockTrip.bus),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: getRepositoryToken(Trip),
          useValue: tripRepo,
        },
        {
          provide: getRepositoryToken(Bus),
          useValue: busRepo,
        },
        {
          provide: getRepositoryToken(Route), // 👈 THIS LINE FIXES THE ERROR
          useValue: routeRepo,
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
  });

  it('should create a trip', async () => {
    const dto = {
      busId: 'e97827e0-dfc0-4f13-bd60-f3e5ddd1739a',
      route: 'R1',
      startTime: new Date(),
    };
    const result = await service.create(dto);
    expect(result).toEqual(mockTrip);
    expect(busRepo.findOneBy).toHaveBeenCalledWith({ busId: dto.busId });
    expect(tripRepo.create).toHaveBeenCalled();
    expect(tripRepo.save).toHaveBeenCalled();
  });

  it('should return all trips', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockTrip]);
    expect(tripRepo.find).toHaveBeenCalled();
  });
});
