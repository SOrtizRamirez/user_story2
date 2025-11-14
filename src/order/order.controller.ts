import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}
