import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
      envFilePath: '.env',
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
