import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller('orders')
export class OrderController {
  //Inyectamos el servicio
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.remove(id);
  }
}
