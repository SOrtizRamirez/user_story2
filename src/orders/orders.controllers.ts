// src/orders/orders.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Query, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.services';
import { CreateOrderDto, GetOrdersDto } from '../dtos/create-order.dto';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
class AddItemDto {
  @Type(() => Number) @IsInt() productId!: number;
  @Type(() => Number) @IsInt() @Min(1) quantity!: number;
}

// Reutiliza PaginationDto si quieres
class OrdersByClientQuery {
  @Type(() => Number) @IsInt() @Min(1) clientId?: number;
  @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @Type(() => Number) @IsInt() @Min(1) limit?: number = 10;
}
@UseGuards(JwtAuthGuard)  
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }
  
  @Get()
  // @Roles(Role.ADMIN)  // si lo quieres solo para admins
  findAll(@Query() query: GetOrdersDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get()
  findByClient(@Query() q: OrdersByClientQuery) {
    if (!q.clientId) {
      throw new BadRequestException('clientId is required');
    }
    return this.service.findAllByClient(q.clientId, q.page, q.limit);
  }

  @Post(':id/items')
  addItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddItemDto,
  ) {
    return this.service.addItem({ orderId: id, ...dto });
  }

  @Delete(':orderId/items/:itemId')
  removeItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.service.removeItem(orderId, itemId);
  }
}
