// src/users/dtos/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
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

export class UpdateUserDto extends PartialType(CreateUserDto) {}
