import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser( loginDto );
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    
    const user = await this.userService.create( registerDto );

    return { message: 'Usuario registrado correctamente', user };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.refresh(req.user);
  }
}

// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// @ApiTags('auth') //  Agrupa los endpoints bajo "auth" en Swagger
// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//   ) {}

//   @Post('register')
//   @ApiOperation({ summary: 'Registrar un nuevo usuario' })
//   @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
//   @ApiResponse({ status: 400, description: 'Datos inválidos o usuario existente' })
//   @ApiBody({ type: RegisterDto }) //  Muestra la estructura esperada del body
//   async register(@Body() registerDto: RegisterDto) {
//     const { name, email, password } = registerDto;
//     const user = await this.userService.create(name, email, password);
//     return { message: 'Usuario registrado correctamente', user };
//   }

//   @Post('login')
//   @ApiOperation({ summary: 'Iniciar sesión de usuario' })
//   @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso (devuelve token JWT)' })
//   @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
//   @ApiBody({ type: LoginDto })
//   async login(@Body() loginDto: LoginDto) {
//     const { email, password } = loginDto;
//     return this.authService.login(email, password);
//   }
// }
