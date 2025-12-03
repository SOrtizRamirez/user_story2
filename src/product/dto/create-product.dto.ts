import { IsNumber, IsString, Min, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({
        example: 'Zapatillas Deportivas X',
        description: 'Nombre del producto',
        required: true
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Zapatillas ideales para running con amortiguación mejorada',
        description: 'Descripción detallada del producto',
        required: true
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: 89.99,
        description: 'Precio del producto',
        minimum: 0,
        required: true
    })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        example: 50,
        description: 'Cantidad disponible en inventario',
        minimum: 0,
        required: true
    })
    @IsNumber()
    @Min(0)
    stock: number;
}