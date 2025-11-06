import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Hace que las variables esten disponibles en toda la app
      envFilePath: '.env', //Ubicacion del archivo de variables .env
      }),

      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true, // carga automática de entidades
        synchronize: true, // solo en desarrollo, crea las tablas automáticamente
      }),

      UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
