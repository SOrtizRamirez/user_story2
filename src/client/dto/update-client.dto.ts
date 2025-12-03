import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateClientDto {
    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del cliente',
        required: false
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        example: 'juan.perez@ejemplo.com',
        description: 'Correo electrónico del cliente',
        required: false
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        example: 'nuevacontraseña123',
        description: 'Nueva contraseña (mínimo 6 caracteres)',
        minLength: 6,
        required: false
    })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}