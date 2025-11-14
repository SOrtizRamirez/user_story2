import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              
    forbidNonWhitelisted: true,   
    transform: true,              
    transformOptions: { enableImplicitConversion: true },
  }));
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
