// src/users/dtos/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  refreshTokenHash?: string | undefined;
}

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(Role, { message: 'Role must be admin, client or seller' })
  role!: Role;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}