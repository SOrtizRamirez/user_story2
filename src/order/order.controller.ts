import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Órdenes')
@Controller('order')
@UseGuards(JwtAuthGuard, RbacGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ summary: 'Crear una nueva orden' })
    @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
    @ApiBody({ type: CreateOrderDto })
    @Roles('Admin', 'Seller')
    @Permissions('Create')
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @ApiOperation({ summary: 'Obtener todas las órdenes' })
    @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida exitosamente' })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @ApiOperation({ summary: 'Obtener una orden por ID' })
    @ApiResponse({ status: 200, description: 'Orden encontrada exitosamente' })
    @ApiParam({ name: 'id', description: 'ID de la orden' })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }

    @ApiOperation({ summary: 'Actualizar una orden' })
    @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente' })
    @ApiParam({ name: 'id', description: 'ID de la orden a actualizar' })
    @ApiBody({ type: UpdateOrderDto })
    @Roles('Admin', 'Seller')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }

    @ApiOperation({ summary: 'Eliminar una orden' })
    @ApiResponse({ status: 200, description: 'Orden eliminada exitosamente' })
    @ApiParam({ name: 'id', description: 'ID de la orden a eliminar' })
    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}
