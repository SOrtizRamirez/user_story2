import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del cliente',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'juan.perez@ejemplo.com',
        description: 'Correo electrónico del cliente',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'micontraseña123',
        description: 'Contraseña del cliente (mínimo 6 caracteres)',
        minLength: 6,
        required: true
    })
    @IsString()
    @MinLength(6)
    password: string;
}