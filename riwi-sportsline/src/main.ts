import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { AuditMiddleware } from './common/audit/audit.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new AuditMiddleware().use);
  app.useGlobalFilters(new HttpExceptionFilter())
  //app.useGlobalInterceptors(new LoggingInterceptor());  //Interceptos globales

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si se envían propiedades extras
      transform: true, // convierte los tipos automáticamente
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
