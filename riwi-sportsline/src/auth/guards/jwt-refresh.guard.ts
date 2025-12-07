import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}  //Activa la estrategia del refresh
