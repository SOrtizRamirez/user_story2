import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obtener detalles de la solicitud
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;

    const start = Date.now();

    // `next.handle()` ejecuta el método del controlador
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const time = end - start;
        console.log(
          `${method} ${originalUrl} - ${time}ms`
        );
      }),
    );
  }
}
