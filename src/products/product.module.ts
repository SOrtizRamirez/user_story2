import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { OrderItem } from '../orders/order-item.entity';
import { ProductsService } from './products.services';
import { ProductsController } from './products.controllers';
import { ApiKeyModule } from '../api-key/api-key.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, OrderItem]),
    ApiKeyModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
