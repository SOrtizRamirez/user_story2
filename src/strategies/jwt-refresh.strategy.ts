import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // importante para tener el req en validate
    });
  }

  async validate(req: Request, payload: any) {
    // Sacamos el token crudo del header
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // Lo que retorne validate se guarda en req.user
    return {
      userId: payload.sub,
      refreshToken,
    };
  }
}
