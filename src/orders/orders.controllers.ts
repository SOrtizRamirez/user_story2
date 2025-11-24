// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { OrdersService } from './orders.services';
import { CreateOrderDto, GetOrdersDto } from '../dtos/create-order.dto';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
import { ApiTags, ApiBearerAuth, ApiSecurity, ApiHeader } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ApiKeyScopes } from '../common/decorators/api-key-scopes.decorator';

class AddItemDto {
  @Type(() => Number)
  @IsInt()
  productId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

// ejemplo de query DTO para filtrar órdenes por cliente / estado
class OrdersByClientQuery {
  @Type(() => Number)
  @IsInt()
  clientId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  // 🔐 Endpoints internos (JWT + roles)

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  findAll(@Query() query: GetOrdersDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  create(@Body() dto: CreateOrderDto) {
    if (!dto.clientId || !dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must have a client and at least one item');
    }
    return this.service.create(dto);
  }

  @Post(':id/items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  addItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddItemDto,
  ) {
    return this.service.addItem({ orderId: id, ...dto });
  }

  @Delete(':orderId/items/:itemId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  removeItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.service.removeItem(orderId, itemId);
  }

  @Get('external/by-client')
  @UseGuards(ApiKeyGuard)
  @ApiKeyScopes('orders:read')
  @ApiSecurity('x-api-key')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key para consultar órdenes por cliente',
    required: true,
  })
  findByClientExternal(@Query() query: OrdersByClientQuery) {
    const { clientId, page, limit } = query;
    if (!clientId) {
      throw new BadRequestException('clientId is required');
    }
    return this.service.findAllByClient(clientId);
  }
}
