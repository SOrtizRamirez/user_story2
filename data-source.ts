import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./src/user/user.entity.ts";
import { Client } from "./src/client/client.entity.ts";
import { Product } from "./src/product/product.entity.ts";
import { Order } from "./src/order/order.entity.ts";
import { OrderDetail } from "./src/order/order-detail.entity.ts";

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Client, Product, Order, OrderDetail],
    migrations: ['src/migrations/*.ts'], // acá se guardan las migraciones compiladas
})