import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles('Admin')
    @Permissions('Create')
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }
    
    @Roles('Admin')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}