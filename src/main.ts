import 'reflect-metadata'; // recomendable si usas decorators
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // usa Express por defecto
  await app.listen(3000);
  console.log('🚀 Server on http://localhost:3000');
}
bootstrap();
