import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsEnum } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    @IsEnum(['admin', 'seller'], { message: 'Role must be admin or seller' })
    role?: string;
}