import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entitys/bus.entity';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  create(createBusDto: CreateBusDto): Promise<Bus> {
    const bus = this.busRepository.create({
      ...createBusDto,
      handicapSeatsAvailable: createBusDto.handicapSeatsTotal || 2,
    });
    return this.busRepository.save(bus);
  }

  findAll(): Promise<Bus[]> {
    return this.busRepository.find();
  }

  async findOne(id: string): Promise<Bus> {
    // @ts-ignore
    const bus = await this.busRepository.findOneBy({ busId: id });
    if (!bus) throw new NotFoundException('Bus not found');
    return bus;
  }

  async update(id: string, updateBusDto: UpdateBusDto): Promise<Bus> {
    // @ts-ignore
    const bus = await this.findOne({ busId: id });
    Object.assign(bus, updateBusDto);
    return this.busRepository.save(bus);
  }

  async remove(id: string): Promise<void> {
    // @ts-ignore
    await this.busRepository.delete({ busId: id });
  }
}
