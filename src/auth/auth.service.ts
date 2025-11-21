import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.services';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { RegisterDto } from 'src/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) { }
  

  private getAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const expiresInConfig = this.config.get<string>('JWT_EXPIRES_IN');
    const expiresIn = expiresInConfig ? Number(expiresInConfig) : 900; // 900s = 15 min

    const options: JwtSignOptions = {
      secret: this.config.get<string>('JWT_SECRET') || 'default_access_secret',
      expiresIn, // 👈 ahora es number, TS feliz
    };

    return this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });
  }


  private getRefreshToken(user: User): string {
    const payload = { sub: user.id };

    const refreshExpiresConfig = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
    const expiresIn = refreshExpiresConfig ? Number(refreshExpiresConfig) : 604800;
    const options: JwtSignOptions = {
      secret: this.config.get<string>('JWT_REFRESH_SECRET') || 'default_refresh_secret',
      expiresIn,
    };

    return this.jwt.sign(payload, options);
  }


  async login(user: User) {
    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(user.id, { refreshTokenHash: hash });

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new ForbiddenException('Acceso denegado');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isMatch) throw new ForbiddenException('Acceso denegado');

    const newAccessToken = this.getAccessToken(user);
    const newRefreshToken = this.getRefreshToken(user);

    const newHash = await bcrypt.hash(newRefreshToken, 10);
    await this.usersService.update(user.id, { refreshTokenHash: newHash });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async logout(userId: number) {
    await this.usersService.update(userId, { refreshTokenHash: null });
    return { ok: true, message: 'Sesión cerrada' };
  }


  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });

    if (exists) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepo.save(newUser);
  }
}
