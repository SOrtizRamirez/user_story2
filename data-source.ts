import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "src/user/entities/user.entity";
import { Client } from "src/client/client.entity";
import { Product } from "src/product/product.entity";
import { Order } from "src/order/order.entity";
import { OrderDetail } from "src/order/order-detail.entity";
import { Role } from "src/roles/entities/role.entity";
import { Permission } from "src/roles/entities/permission.entity";

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Client, Product, Order, OrderDetail, Role, Permission],
    migrations: ['src/migrations/*.ts'], // acá se guardan las migraciones compiladas
})