import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuditMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        console.log(`🟢 ${req.method} ${req.originalUrl} - petición recibida`);

        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(
                `⚪ [${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
            );
        });

        next();
    }
}