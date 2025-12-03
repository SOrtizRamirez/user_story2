import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('order')
@UseGuards(JwtAuthGuard, RbacGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Roles('Admin', 'Seller')
    @Permissions('Create')
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }

    @Roles('Admin', 'Seller')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }

    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}
