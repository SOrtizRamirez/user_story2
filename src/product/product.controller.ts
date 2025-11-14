import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }
    
    @UseGuards(RolesGuard)
    @Roles('admin')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}