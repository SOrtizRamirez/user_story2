import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/client.module';
import { UsersModule } from './users/users.module';
import { Product } from './products/product.entity';
import { Order } from './orders/orders.entity';
import { OrderItem } from './orders/order-item.entity';
import { Client } from './clients/client.entity';
import { User } from './users/user.entity';
import 'dotenv/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'sharon',
      password: process.env.DB_PASSWORD|| '0619!',
      database: process.env.DB_NAME || 'riwi_sportsline',
      entities: [Product, Order, OrderItem, Client, User],
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
    ClientsModule,
    UsersModule,
  ],
})
export class AppModule {}
