import { Controller, Get, Post, Param, Body, Patch, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.services';
import { CreateClientDto, UpdateClientDto } from '../dtos/create-client.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';

@UseGuards(RolesGuard, JwtAuthGuard, JwtRefreshGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    const { page, limit } = query;
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
