import { LoggingInterceptor } from './logging.interceptor';
import { ExecutionContext, CallHandler, Request, Response } from '@nestjs/common';
import { of } from 'rxjs';
import { IncomingMessage, ServerResponse } from 'http';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let mockContext: Partial<ExecutionContext>;
  let mockHandler: CallHandler;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();

    const mockRequest = {
      method: 'GET',
      url: '/test',
    };

    mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => ({} as Response),
        getNext: () => () => {},
      } as unknown as HttpArgumentsHost),
    };

    mockHandler = {
      handle: jest.fn(() => of('test response')), // Observable que emite un valor
    };
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should call next.handle()', () => {
    interceptor.intercept(mockContext as ExecutionContext, mockHandler);
    expect(mockHandler.handle).toHaveBeenCalled();
  });

  it('should log initial and final messages', (done) => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    interceptor
      .intercept(mockContext as ExecutionContext, mockHandler)
      .subscribe({
        next: () => {
          // Verifica que se logueó el mensaje inicial
          expect(consoleSpy).toHaveBeenCalledWith(
            `- GET /test - ejecutando controlador`
          );
        },
        complete: () => {
          // Verifica que se logueó el mensaje final
          const finalLog = consoleSpy.mock.calls[1][0];
          expect(finalLog).toContain('- GET /test -');
          expect(finalLog).toMatch(/ms/);

          consoleSpy.mockRestore();
          done();
        },
      });
  });
});
