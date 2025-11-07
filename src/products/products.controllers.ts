import { Controller, Get, Post, Param, Body, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.services';
import { CreateProductDto, UpdateProductDto } from '../dtos/create-product.dto'; 
import { PaginationDto } from '../dtos/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {          
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {         
    const { page, limit } = query;
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { 
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,                 
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/disable')
  disable(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDisable(id);
  }
}
