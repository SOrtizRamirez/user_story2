import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from "./dto/update-product.dto";
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('products')
@UseInterceptors(LoggingInterceptor) // se aplica a todo el controlador
@UseGuards(RolesGuard)
export class ProductController {
  //Inyectamos el servicio
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  @Roles('admin', 'user')
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  delete(@Param('id') id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
