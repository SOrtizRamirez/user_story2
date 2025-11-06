import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
      envFilePath: '.env',
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),

          autoLoadEntities: true,
          synchronize: true, // SOLO PARA DESARROLLO
        }),
      }),
      UserModule,
      ClientModule,
      ProductModule,
      OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
