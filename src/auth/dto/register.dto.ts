import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/entities/role.entity";

export class RegisterDto {
    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Correo electrónico del nuevo usuario',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del usuario',
        required: true
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'micontraseña123',
        description: 'Contraseña (mínimo 6 caracteres)',
        minLength: 6,
        required: true
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 1,
        description: 'ID del rol del usuario (opcional, por defecto se asigna el rol de cliente)',
        required: false
    })
    @IsNumber()
    @IsOptional()
    role?: Role;
}