import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsEmail({}, { message: 'El email debe ser un número' })
  email: string;

  @IsString({ message: 'el telefono debe ser un texto' })
  phone: string;

  @IsString({ message: 'La direccion debe ser un texto' })
  address?: string;
}
