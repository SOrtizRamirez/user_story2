import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if no roles are required', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'user' }
        })
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should return true if user has required role', () => {
    const requiredRoles = ['admin'];
    jest.spyOn(reflector, 'get').mockReturnValue(requiredRoles);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'admin' }
        })
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should throw UnauthorizedException if user has no role', () => {
    const requiredRoles = ['admin'];
    jest.spyOn(reflector, 'get').mockReturnValue(requiredRoles);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: null
        })
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user role is not in required roles', () => {
    const requiredRoles = ['admin'];
    jest.spyOn(reflector, 'get').mockReturnValue(requiredRoles);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'user' }
        })
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });
});