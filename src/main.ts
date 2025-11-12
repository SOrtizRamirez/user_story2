import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditMiddleware } from './common/middleware/audit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new AuditMiddleware().use)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
