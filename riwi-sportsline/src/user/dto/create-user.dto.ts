import { IsNotEmpty, IsString, IsEmail, isString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'El estado debe ser un texto' })
  password: string;

  @IsString({ message: 'el rol debe ser texto'})
  role: string
}
