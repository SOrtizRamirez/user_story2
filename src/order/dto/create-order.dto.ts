import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({
        example: 2,
        description: 'Cantidad de productos en la orden',
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({
        example: 1,
        description: 'ID del usuario que crea la orden',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        example: 1,
        description: 'ID del producto a ordenar',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        example: 1,
        description: 'ID del cliente que realiza el pedido',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    clientId: number;
}