import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if(existing) throw new BadRequestException('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            ...dto,
            password: hashed,
        });

        return { message: `User '${user.name}' registered` };
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new BadRequestException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.password);
        if(!valid) throw new BadRequestException('Invalid credentials');

        const payload = { sub: user.id, email: user.email, role: user.role };

        const token = this.jwtService.sign(payload, {
            expiresIn: '15m'
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_SECRET,
        })

        // guardamos el hash del refresh token
        const rtHash = await bcrypt.hash(refreshToken, 10);
        await this.usersService.updateRefreshTokenHash(payload.sub, rtHash);
        
        return { access_token: token, refresh_token: refreshToken }
    }

    async refreshToken(id: number, refreshToken: string) {
        // Buscar usuario
        const user = await this.usersService.findOne(id);
        if (!user || !user.refreshToken) {
            throw new BadRequestException('Invalid refresh token');
        }

        // Comparar refresh token enviado vs hash guardado
        const valid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!valid) throw new BadRequestException('Invalid refresh token');

        const payload = { sub: user.id, email: user.email, role: user.role };

        // Nuevo access token
        const newAccess = this.jwtService.sign(payload, {
            expiresIn: '15m'
        })

        // Nuevo refresh token
        const newRefresh = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_SECRET
        })

        // nuevo hash del refresh token
        const hashed = await bcrypt.hash(newRefresh, 10);
        await this.usersService.updateRefreshTokenHash(id, hashed);

        // retornar nuevos tokens
        return {
            access_token: newAccess,
            refresh_token: newRefresh
        };
    }
}
