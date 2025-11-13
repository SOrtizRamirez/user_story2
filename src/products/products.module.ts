import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.services';
import { ProductsController } from './products.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsController],
  exports: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
