import { Module } from '@nestjs/common';

import { configService } from './shared/database/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsModules } from './components/components.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ComponentsModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
