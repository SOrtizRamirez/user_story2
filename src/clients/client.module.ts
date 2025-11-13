import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './client.entity';
import { ClientsRepository } from './clients.repository';
import { ClientsService } from './clients.services';
import { ClientsController } from './clients.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsRepository, ClientsService],
  controllers: [ClientsController],
  exports: [ClientsRepository, ClientsService],
})
export class ClientsModule {}
