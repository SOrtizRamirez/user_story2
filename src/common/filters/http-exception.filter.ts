import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = isHttp
      ? (exception as HttpException).getResponse()
      : { message: 'Internal server error' };

    const errorBody = {
      ok: false,
      statusCode: status,
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      error: payload,
    };

    res.status(status).json(errorBody);
  }
}
