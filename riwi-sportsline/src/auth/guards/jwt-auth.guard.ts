import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}  //Este guard activa la estrategia JwtStrategy que configuraste en tu proyecto.
