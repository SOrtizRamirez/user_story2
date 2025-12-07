import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt',) {
  constructor() {
    const secret = process.env.JWT_SECRET
        if (!secret) throw new NotFoundException('no asignable')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Define dónde se encuentra el token JWT Bearer
      ignoreExpiration: false, // NO se aceptan tokens vencidos.
      secretOrKey: secret
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
