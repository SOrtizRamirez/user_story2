import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentTypeValidationMiddleware implements NestMiddleware {
    private methodsRequiringJson = new Set(['POST', 'PUT', 'PATCH']);

    use(req: Request, _res: Response, next: NextFunction) {
        if (this.methodsRequiringJson.has(req.method)) {
            const contentType = req.headers['content-type'] ?? '';
            if (!String(contentType).includes('application/json')) {
            throw new BadRequestException('Content-Type must be application/json');
        } 
    }
    next();
    }
}
