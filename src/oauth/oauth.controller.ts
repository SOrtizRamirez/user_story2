// src/oauth/oauth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OauthService } from './oauth.service';

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['profile', 'email'])
  @ApiOperation({ summary: 'Redirige a Google para iniciar sesión con OAuth2' })
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['profile', 'email'])
  @ApiOperation({
    summary:
      'Callback de Google. Valida el usuario y devuelve tokens JWT internos',
  })
  async googleAuthCallback(@Req() req: any) {
    console.log('✅ googleUser desde GoogleStrategy:', req.user);

    const googleUser = req.user;

    const { user, accessToken, refreshToken } =
      await this.oauthService.handleGoogleCallback(googleUser);

    return {
      message: 'Google login successful',
      user,
      accessToken,
      refreshToken,
    };
  }
}
