import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMS_KEY } from "../decorators/permissions.decorator";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Request } from "express";

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {

        const req = ctx.switchToHttp().getRequest<Request>();
        const user = req.user as any; // user provisto por JwtStrategy (passport)
        if(!user) return false;

        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, ctx.getHandler()) || [];
        const requiredPerms = this.reflector.get<string[]>(PERMS_KEY, ctx.getHandler()) || [];

        // leer Roles/Permisos del usuario desde JWT
        const userRoles = Array.isArray(user.role) ? user.role : [user.role];
        const userPerms = Array.isArray(user.perms) ? user.perms : [];

        if(requiredRoles.length) {
            const hasRole = requiredRoles.some(role => userRoles.includes(role));
            if(!hasRole) throw new ForbiddenException('Missing role');
        }

        if(requiredPerms.length) {
            const hasPerm = requiredPerms.some(perm => userPerms.includes(perm));
            if(!hasPerm) throw new ForbiddenException('Missing permission');
        }

        return true;
    }
}