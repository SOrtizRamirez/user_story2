import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Define dónde se encuentra el token JWT Bearer
      ignoreExpiration: false, // NO se aceptan tokens vencidos.
      secretOrKey:
        process.env.JWT_SECRET ||
        'dhbcjabBJHBSJBhbyo67jb53vjK756Gjcfes343DVK98', // clave secreta usada para verificar que el token es válido
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
