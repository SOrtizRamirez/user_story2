// src/oauth/oauth.module.ts
import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],         
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
