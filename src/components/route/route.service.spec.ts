import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from './route.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entitys/route.entity';

const mockRoute = {
  id: 1,
  name: 'R1',
  origin: 'A',
  destination: 'B',
};

describe('RouteService', () => {
  let service: RouteService;
  let repo: Repository<Route>;

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockRoute),
    save: jest.fn().mockResolvedValue(mockRoute),
    find: jest.fn().mockResolvedValue([mockRoute]),
    findOneBy: jest.fn().mockResolvedValue(mockRoute),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        {
          provide: getRepositoryToken(Route),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RouteService>(RouteService);
    repo = module.get<Repository<Route>>(getRepositoryToken(Route));
  });

  it('should create a route', async () => {
    const result = await service.create({
      name: 'R1',
      origin: 'A',
      destination: 'B',
    });
    expect(result).toEqual(mockRoute);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });

  it('should return all routes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockRoute]);
    expect(repo.find).toHaveBeenCalled();
  });
});
