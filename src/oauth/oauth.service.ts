// src/oauth/oauth.service.ts
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

interface GoogleUserPayload {
  provider: string;      // 'google'
  providerId: string;    // id de Google
  email?: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class OauthService {
  constructor(private readonly authService: AuthService) {}
  async handleGoogleCallback(googleUser: GoogleUserPayload) {
    return this.authService.validateGoogleLogin(googleUser);
  }
}
