//sirve para cuando se haga una peticion capture el metodo y el tiempo 
// src/audit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `${req.method} ${req.originalUrl} - ${new Date().toISOString()}`
    );
    next();
  }
}
