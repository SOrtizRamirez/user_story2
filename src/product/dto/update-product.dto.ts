import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        example: 'Zapatillas Deportivas X Pro',
        description: 'Nuevo nombre del producto (opcional)',
        required: false
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        example: 'Zapatillas mejoradas con tecnología avanzada',
        description: 'Nueva descripción del producto (opcional)',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 99.99,
        description: 'Nuevo precio del producto (opcional)',
        minimum: 0,
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 75,
        description: 'Nueva cantidad en stock (opcional)',
        minimum: 0,
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;
}