// src/database/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';
import { Order } from '../orders/orders.entity';
// agrega aquí todas tus entidades

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'sharon',
  password: process.env.DB_PASSWORD || '0619!',
  database: process.env.DB_NAME || 'riwi_sportline',
  entities: [User, Client, Product, Order],
  synchronize: false, // en producción SIEMPRE false
};
