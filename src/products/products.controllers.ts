import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.services';
import { Product } from './product.entity';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
import { ApiTags, ApiBearerAuth, ApiSecurity, ApiHeader } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ApiKeyScopes } from '../common/decorators/api-key-scopes.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('external')
  @UseGuards(ApiKeyGuard)
  @ApiKeyScopes('products:read')
  @ApiSecurity('x-api-key')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key para consultar productos desde sistemas externos',
    required: true,
  })
  findAllExternal(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('jwt')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
