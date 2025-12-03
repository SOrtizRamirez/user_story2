import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditMiddleware } from './common/middleware/audit.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Interceptor global
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API de RIWI Sportsline')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
