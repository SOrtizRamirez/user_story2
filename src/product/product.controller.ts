import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
    @ApiBody({ type: CreateProductDto })
    @Roles('Admin')
    @Permissions('Create')
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto encontrado' })
    @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }
    
    @ApiOperation({ summary: 'Actualizar un producto existente' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del producto a actualizar', type: Number })
    @ApiBody({ type: UpdateProductDto })
    @Roles('Admin')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @ApiOperation({ summary: 'Eliminar un producto' })
    @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del producto a eliminar', type: Number })
    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}