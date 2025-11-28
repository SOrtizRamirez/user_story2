import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNumber()
    @IsOptional()
    role: Role;
}