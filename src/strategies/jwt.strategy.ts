import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.services';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
    });
  }

  async validate(payload: any) {
    console.log('🔐 Validando JWT payload:', payload);
    
    const user = await this.usersService.findOne(payload.sub);
    console.log('👤 Usuario encontrado:', user);
    console.log('🔑 refreshTokenHash:', user?.refreshTokenHash);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.refreshTokenHash) {
      console.log('⛔ Token inválido - refreshTokenHash está null');
      throw new UnauthorizedException('User has been logged out');
    }

    return { id: payload.sub, email: payload.email };
  }
}