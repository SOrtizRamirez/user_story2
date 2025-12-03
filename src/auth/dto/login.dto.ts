import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Correo electrónico del usuario',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'micontraseña123',
        description: 'Contraseña del usuario',
        required: true
    })
    @IsString()
    password: string;
}