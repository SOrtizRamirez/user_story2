import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //  Leer los roles requeridos desde los metadatos
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles, cualquiera puede acceder
    }

    //  Obtener el usuario de la request (agregado por el auth middleware o strategy)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //  Validar que exista usuario y su rol esté permitido
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }

    return true; // Tiene acceso
  }
}
