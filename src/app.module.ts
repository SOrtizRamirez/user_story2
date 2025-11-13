import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/client.module';
import { OrdersModule } from './orders/orders.module';
import { typeOrmConfig } from './database/typeorm.config';
import { AuditMiddleware } from './common/middlewares/audit.middleware';
import { ContentTypeValidationMiddleware } from './common/middlewares/content-type.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware, ContentTypeValidationMiddleware).forRoutes('*');
  }
}
