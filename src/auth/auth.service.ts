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


  private getAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const options: JwtSignOptions = {
      expiresIn:
        Number(this.configService.get<string | number>('JWT_ACCESS_EXPIRES_IN') ||
          '15m'),
    };

    return this.jwtService.sign(payload, options);
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

  // ✅ Registro clásico con email/password
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
      throw new UnauthorizedException(
        'Google account does not have a public email',
      );
    }

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.createFromOAuth({
        email,
        name,
        avatar,
        provider: 'google',
        providerId,
      });
    }

    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }


  async logout(userId: number): Promise<{ message: string }> {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logout successful' };
  }

}
