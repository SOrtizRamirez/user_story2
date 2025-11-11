//Middleware de auditoría
import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const started = Date.now();
        const requestId = req.header('x-request-id') ?? randomUUID();
        res.setHeader('x-request-id', requestId);
    console.log(`[REQ] ${requestId} ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
        const ms = Date.now() - started;
        console.log(
        `[RES] ${requestId} ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms} ms)`,
        );
    });
    next();
    }
}
