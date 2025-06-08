import { Test, TestingModule } from '@nestjs/testing';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

describe('BusController', () => {
  let controller: BusController;

  const mockBusService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusController],
      providers: [
        {
          provide: BusService,
          useValue: mockBusService,
        },
      ],
    }).compile();

    controller = module.get<BusController>(BusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
