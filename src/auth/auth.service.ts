import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
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
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  // ✅ Validación de credenciales para login "clásico"
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }


  async login(user: User) {
    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    const hash = await bcrypt.hash(refreshToken, 10);

    // 👇 Guardamos el hash en la BD
    await this.usersService.updateRefreshToken(user.id, hash);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }


  getAccessToken(user: User): string {
    const payload = { sub: user.id, email: user.email, role: user.role };

    // PRUEBA BRUTAL: hardcodear el secret
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || '', // 👈 HARDCODEADO
      expiresIn: '15m',
    });
  }

  private getRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    const options: JwtSignOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        Number(this.configService.get<string | number>('JWT_REFRESH_EXPIRES_IN') ||
          '7d'),
    };

    return this.jwtService.sign(payload, options);
  }

  async refreshTokens(userId: number): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    const accessToken = this.getAccessToken(user);
    return { accessToken };
  }

  async register(dto: RegisterDto): Promise<User> {
    const exists = await this.usersService.findByEmail(dto.email);
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

  async validateGoogleLogin(googleUser: {
    provider: string;
    providerId: string;
    email?: string;
    name?: string;
    avatar?: string;
  }) {
    const { email, providerId, name, avatar } = googleUser;

    if (!email) {
      throw new BadRequestException('Email not provided by OAuth provider');
    }

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email,
        name: name || 'OAuth User',
        password: '', 
        provider: 'google',
        providerId,
        avatar,
      });
    }

    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }


  async logout(userId: number): Promise<{ message: string }> {
    try {
      console.log('🔍 userId recibido:', userId);
      
      // 1️⃣ Validar que el usuario existe
      const user = await this.usersService.findOne(userId);
      console.log('👤 Usuario encontrado:', user);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      console.log('🗑️ Limpiando refresh token...');
      await this.usersService.updateRefreshToken(userId, null);
      console.log('✅ Token limpiado');

      if (user.provider && user.providerId) {
        return { message: `Logout successful for ${user.provider} user` };
      }

      return { message: 'Logout successful' };
    } catch (error) {
      console.error('❌ Error en logout:', error);
      throw error;
    }
  }
}
