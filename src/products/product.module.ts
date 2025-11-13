import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { OrderItem } from '../orders/order-item.entity';
import { ProductsService } from './products.services';
import { ProductsController } from './products.controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, OrderItem]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
