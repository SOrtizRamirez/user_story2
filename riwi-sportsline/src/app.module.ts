import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Hace que las variables esten disponibles en toda la app
      envFilePath: '.env', //Ubicacion del archivo de variables .env
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
