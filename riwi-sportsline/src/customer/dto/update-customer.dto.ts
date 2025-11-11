import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser un número' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'El teleono debe ser un texto' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'La direccion debe ser un texto' })
  address?: string;
}

