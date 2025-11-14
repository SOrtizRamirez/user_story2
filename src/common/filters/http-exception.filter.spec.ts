import { HttpExceptionFilter } from './http-exception.filter';
import { ArgumentsHost, HttpException } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockRequest = {
      url: '/test',
    };

    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as any;
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should format and return the response correctly', () => {
    const exception = new HttpException('Error message', 400);

    filter.catch(exception, mockHost);

    const mockResponse = mockHost.switchToHttp().getResponse();
    const mockRequest = mockHost.switchToHttp().getRequest();

    // Verifica que response.status() fue llamado con el status correcto
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // Verifica que json() fue llamado con el body correcto
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        succes: false,
        statusCode: 400,
        path: '/test',
        message: exception.getResponse(),
        timestamp: expect.any(String), // timestamp dinámico
      }),
    );
  });
});
