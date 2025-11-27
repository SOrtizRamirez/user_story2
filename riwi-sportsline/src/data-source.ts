// Migraciones
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Customer, Product, Order],
  migrations: ['dist/migrations/*.js'],
});
