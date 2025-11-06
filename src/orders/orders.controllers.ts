import { Controller, Get, Post, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.services';

// DTOs mínimos para usar ya (puedes moverlos a /dtos y agregar class-validator luego)
type CreateOrderDto = {
  clientId: number;
  userId?: number;
  items: Array<{ productId: number; quantity: number }>;
};

type AddItemDto = {
  productId: number;
  quantity: number;
};

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  /** Crear orden con items */
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  /** Detalle completo de la orden */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /** Listar órdenes por cliente ?clientId=&page=&limit= */
  @Get()
  findByClient(
    @Query('clientId') clientId?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (!clientId) {
      // Si quieres, aquí podrías devolver todas las órdenes o forzar clientId. Por ahora, forzamos clientId.
      // return this.service.findAll(+page, +limit) // si implementas un listado general
      return { message: 'Provide clientId to list orders by client.' };
    }
    return this.service.findAllByClient(+clientId, +page, +limit);
  }

  /** Agregar item a una orden existente */
  @Post(':id/items')
  addItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddItemDto,
  ) {
    return this.service.addItem({ orderId: id, ...dto });
  }

  /** Eliminar item de una orden */
  @Delete(':orderId/items/:itemId')
  removeItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.service.removeItem(orderId, itemId);
  }
}
