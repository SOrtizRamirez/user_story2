import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ecomerce',
  entities: [User, Customer, Product, Order],
  migrations: ['dist/migrations/*.js'], // <- importante
  synchronize: true,
});
