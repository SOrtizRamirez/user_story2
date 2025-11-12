import { DataSource } from 'typeorm';
import { Order } from './order/entities/order.entity';
import { Product } from './product/entities/product.entity';
import { Customer } from './customer/entities/customer.entity';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Atope199*',
  database: 'ecomerce',
  entities: [User, Customer, Product, Order],
  migrations: ['dist/migrations/*.js'], // o 'src/migrations/*.ts' si usas ts-node
  synchronize: false, // importante: desactiva esto en producción
});
