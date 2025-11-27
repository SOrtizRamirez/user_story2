import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,  //habilita el uso de Passport. También permite usar @UseGuards(AuthGuard('jwt')) en controladores o rutas
    JwtModule.register({ // registrar el modulo JWT se para firmar y verificar tokens 
      secret: process.env.JWT_SECRET || 'dhbcjabBJHBSJBhbyo67jb53vjK756Gjcfes343DVK98',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
