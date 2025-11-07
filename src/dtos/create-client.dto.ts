// src/clients/dtos/create-client.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString() documentNumber?: string;
  @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
}

export class UpdateClientDto {
  @IsOptional() @IsString() documentNumber?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
}
