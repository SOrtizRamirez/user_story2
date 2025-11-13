import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('orders')
@UseInterceptors(LoggingInterceptor) // se aplica a todo el controlador
@UseGuards(RolesGuard)
export class OrderController {
  //Inyectamos el servicio
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findById(@Param('id') id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Post()
  @Roles('admin', 'user')
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.remove(id);
  }
}
