import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from '../common/guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guards';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from 'src/dtos/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@CurrentUser() user: any) {
    return this.authService.refreshTokens(user.userId);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  async logout(@Req() req: any) {
    const userId = req.user?.sub || req.user?.id;
    await this.authService.logout(userId);
    return {
      message: 'Logout successful',
    };
  }

}
