import { IsNumber, IsOptional, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        example: 3,
        description: 'Nueva cantidad de productos (opcional)',
        minimum: 1,
        required: false
    })
    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity?: number;

    @ApiProperty({
        example: 2,
        description: 'Nuevo ID de producto (opcional)',
        required: false
    })
    @IsNumber()
    @IsOptional()
    productId?: number;

    @ApiProperty({
        example: 2,
        description: 'Nuevo ID de cliente (opcional)',
        required: false
    })
    @IsNumber()
    @IsOptional()
    clientId?: number;
}