import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}

// HU3 - Tarea 1 - "Generar los módulos, controladores y servicios de usuario, producto y cliente." - LISTA.