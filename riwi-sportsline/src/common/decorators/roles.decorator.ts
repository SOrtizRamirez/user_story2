import { SetMetadata } from '@nestjs/common';

// Este decorador añade metadatos a la ruta
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
