// src/database/datasource.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';
import { Order } from '../orders/orders.entity';
import { OrderItem } from '../orders/order-item.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME ?? 'sharon',
  password: process.env.DB_PASSWORD ?? '0619!',
  database: process.env.DB_NAME ?? 'riwi_sportsline',
  entities: [User, Product, Order, OrderItem, Client],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
