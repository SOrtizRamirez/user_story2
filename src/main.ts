import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditMiddleware } from './common/middleware/audit.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Middleware global
  app.use(new AuditMiddleware().use);

  // Pipes globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina lo que mo esté declarado en DTO
    forbidNonWhitelisted: true, // lanza error si se envía algo que no está en DTO
    transform: true, // transforma los datos
  }));

  // Exception Filter global
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
