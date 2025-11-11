import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser un texto' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser un texto' })
  role?: string;
}
