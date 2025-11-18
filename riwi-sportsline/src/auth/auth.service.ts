import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Contraseña incorrecta');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.validateUser(email, password);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { sub: user.id, email: user.email };

    return {
      message: 'Login exitoso',
      access_token: this.jwtService.sign(payload),
    };
  }
}
