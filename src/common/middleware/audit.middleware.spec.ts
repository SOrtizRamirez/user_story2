import { AuditMiddleware } from './audit.middleware';
import { Request, Response, NextFunction } from 'express';

describe('AuditMiddleware', () => {
  let middleware: AuditMiddleware;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    middleware = new AuditMiddleware();

    mockReq = {
      method: 'GET',
      originalUrl: '/test',
    };

    mockRes = {
      statusCode: 200,
      on: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call next()', () => {
    middleware.use(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should log initial request', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(consoleSpy).toHaveBeenCalledWith(
      `🟢 ${mockReq.method} ${mockReq.originalUrl} - petición recibida`
    );

    consoleSpy.mockRestore();
  });

  it('should log finish event with status code and duration', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    let finishCallback: Function;

    // Captura el callback que se registra en res.on('finish', callback)
    (mockRes.on as jest.Mock).mockImplementation((event: string, cb: Function) => {
      if (event === 'finish') finishCallback = cb;
    });

    middleware.use(mockReq as Request, mockRes as Response, mockNext);

    // Simula finish emitido
    finishCallback!();

    expect(consoleSpy).toHaveBeenCalledTimes(2); // log inicial + log final

    const callArgs = consoleSpy.mock.calls[1][0];
    expect(callArgs).toContain('⚪');      // Es el log final
    expect(callArgs).toContain('GET');    // Método
    expect(callArgs).toContain('/test');  // URL
    expect(callArgs).toContain('(0ms');   // Tiempo aproximado

    consoleSpy.mockRestore();
  });
});
