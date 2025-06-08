import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entitys/route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  create(createDto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepository.create(createDto);
    return this.routeRepository.save(route);
  }

  findAll(): Promise<Route[]> {
    return this.routeRepository.find();
  }

  async findOne(id: number): Promise<Route> {
    // @ts-ignore
    const route = await this.routeRepository.findOneBy({ id });
    if (!route) throw new NotFoundException('Route not found');
    return route;
  }

  async update(id: number, dto: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id);
    Object.assign(route, dto);
    return this.routeRepository.save(route);
  }

  async remove(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
