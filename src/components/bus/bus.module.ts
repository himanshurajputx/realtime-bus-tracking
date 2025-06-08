import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entitys/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
