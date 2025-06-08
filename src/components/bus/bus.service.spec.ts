import { Test, TestingModule } from '@nestjs/testing';
import { BusService } from './bus.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entitys/bus.entity';

const mockBus = {
  id: 'fe1e5aae-93d1-4e5b-a8f9-b7fb6e3faaf4',
  numberPlate: 'DL01AB1234',
  operatorName: 'HRx Operator',
  handicapSeatsTotal: 2,
  handicapSeatsAvailable: 2,
};

describe('BusService', () => {
  let service: BusService;
  let repo: Repository<Bus>;

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockBus),
    save: jest.fn().mockResolvedValue(mockBus),
    find: jest.fn().mockResolvedValue([mockBus]),
    findOneBy: jest.fn().mockResolvedValue(mockBus),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusService,
        {
          provide: getRepositoryToken(Bus),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BusService>(BusService);
    repo = module.get<Repository<Bus>>(getRepositoryToken(Bus));
  });

  it('should create a bus', async () => {
    const result = await service.create({
      numberPlate: 'DL01AB1234',
      operatorName: 'HRx Operator',
      handicapSeatsTotal: 2,
    });
    expect(result).toEqual(mockBus);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });

  it('should find all buses', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockBus]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find a bus by id', async () => {
    const result = await service.findOne(
      'fe1e5aae-93d1-4e5b-a8f9-b7fb6e3faaf4',
    );
    expect(result).toEqual(mockBus);
    expect(repo.findOneBy).toHaveBeenCalledWith({
      busId: 'fe1e5aae-93d1-4e5b-a8f9-b7fb6e3faaf4',
    });
  });
});
