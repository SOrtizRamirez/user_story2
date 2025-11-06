import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './orders.entity';
import { OrderItem } from './order-item.entity';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.services';
import { OrdersController } from './orders.controller';

import { ProductsModule } from '../products/products.module';
import { ClientsModule } from '../clients/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => ProductsModule),
    forwardRef(() => ClientsModule),
  ],
  providers: [OrdersRepository, OrdersService],
  controllers: [OrdersController],
  exports: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
