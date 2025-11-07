import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Customer } from './customer/entities/customer.entity';
import { Order } from "./order/entities/order.entity";
import { Product } from "./product/entities/product.entity";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    //  Cargar variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true, // disponible en toda la app
      envFilePath: '.env', // especifica la ruta del archivo
    }),

    //  Conexión a PostgreSQL con TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, Customer],
      //autoLoadEntities: true, // carga entidades automáticamente
      //synchronize: true, //  crea tablas automáticamente (solo en desarrollo)
      synchronize: true, //  crea tablas automáticamente (solo en desarrollo)

    }),

    //  Módulo de tareas (u otros)
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
