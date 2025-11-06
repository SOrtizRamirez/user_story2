import { Controller, Get, Post, Param, Body, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.services';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() dto: Partial<Product>) {
    // dto: { sku, name, description?, price, isActive? }
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<Product>,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/disable')
  disable(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDisable(id);
  }
}
