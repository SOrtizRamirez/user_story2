// src/oauth/oauth.service.ts
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/common/enums/role.enum';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

// src/oauth/google-user-payload.interface.ts
export interface GoogleUserPayload {
  provider: 'google';
  providerId: string;
  email?: string;
  name?: string;
  avatar?: string;
  accessToken: string;
}

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async handleGoogleCallback(googleUser: GoogleUserPayload) {
    try {
      const { email, name } = googleUser;

      if (!email) {
        throw new BadRequestException(
          'No se pudo obtener el email desde Google',
        );
      }

      // 1. Buscar usuario por email
      let user = await this.usersRepo.findOne({ where: { email } });

      // 2. Si no existe, crearlo
      if (!user) {
        // password dummy porque tu columna password es NOT NULL
        const randomPassword = Math.random().toString(36).slice(-10);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user = this.usersRepo.create({
          name: name ?? 'Google User',
          email,
          password: hashedPassword,
          role: Role.CLIENT,
          refreshTokenHash: null,
        });

        user = await this.usersRepo.save(user);
      }

      // 3. Generar tokens con tu AuthService (el mismo que usas en login normal)
      const { accessToken, refreshToken } = await this.authService.login(user);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.error('❌ Error en handleGoogleCallback:', err);
      throw new InternalServerErrorException(
        'Error procesando login con Google',
      );
    }
  }
}
