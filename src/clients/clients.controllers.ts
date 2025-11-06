import { Controller, Get, Post, Param, Body, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.services';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Post()
  create(@Body() dto: Partial<Client>) {
    // dto: { documentNumber, name, email?, phone? }
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<Client>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
