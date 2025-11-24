import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiKeyModule } from '../api-key/api-key.module';
import { Client } from './client.entity';
import { ClientsRepository } from './clients.repository';
import { ClientsService } from './clients.services';
import { ClientsController } from './clients.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  ApiKeyModule],
  providers: [ClientsRepository, ClientsService],
  controllers: [ClientsController],
  exports: [ClientsRepository, ClientsService],
})
export class ClientsModule {}
