// src/app.module.ts (ejemplo)
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/client.module';
import { OrdersModule } from './orders/orders.module';
import { typeOrmAsyncConfig } from './database/typeorm.config';
import { AuditMiddleware } from './common/middlewares/audit.middleware';
import { ContentTypeValidationMiddleware } from './common/middlewares/content-type.middleware';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmAsyncConfig),
    UsersModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware, ContentTypeValidationMiddleware).forRoutes('*');
  }
}
