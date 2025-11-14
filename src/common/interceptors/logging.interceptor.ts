import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";

// Observable: Tipo de RxJS que representa una secuencia asíncrona de valores (la respuesta del controlador).
// tap: Operador de RxJS que permite observar (sin modificar) el flujo de datos. Perfecto para logging, ya que no altera la respuesta.

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        console.log(`- ${req.method} ${req.url} - ejecutando controlador`);

        return next.handle().pipe(
            tap(() => console.log(`- ${req.method} ${req.url} - ${Date.now() - now}ms`))
        )
    }
}