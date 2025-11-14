import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.services';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private getAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '15m',
    });
  }

  private getRefreshToken(user: User): string {
    const payload = { sub: user.id };

    return this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
    });
  }

  async login(user: User) {
    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(user.id, { refreshTokenHash: hash });

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findByPk(userId);
    if (!user || !user.refreshTokenHash) {
      throw new ForbiddenException('Acceso denegado');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isMatch) throw new ForbiddenException('Acceso denegado');

    const newAccessToken = this.getAccessToken(user);
    const newRefreshToken = this.getRefreshToken(user);

    const newHash = await bcrypt.hash(newRefreshToken, 10);
    await this.usersService.update(user.id, { refreshTokenHash: newHash });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: number) {
    await this.usersService.update(userId, { refreshTokenHash: null });
    return { message: 'Sesión cerrada' };
  }
}
