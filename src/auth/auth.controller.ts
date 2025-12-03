import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    @ApiBody({ type: RegisterDto })
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso' })
    @ApiBody({ type: LoginDto })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Refrescar token de acceso' })
    @ApiResponse({ status: 201, description: 'Token de acceso refrescado exitosamente' })
    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Req() req: any) {
        const userId = req.user.sub;
        const refreshToken = req.user.refreshToken;

        return this.authService.refreshToken(userId, refreshToken);
    }
}
