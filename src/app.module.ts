// src/app.module.ts (ejemplo)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/client.module';
import { OrdersModule } from './orders/orders.module';
import ormConfig from './typeorm.config'; // tu archivo existente

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
  ],
})
export class AppModule {}
