import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty({
        example: 2,
        description: 'Cantidad de productos',
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({
        example: 29.99,
        description: 'Precio unitario del producto',
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @ApiProperty({
        example: 59.98,
        description: 'Subtotal (cantidad * precio unitario)',
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    subtotal: number;

    @ApiProperty({
        example: 1,
        description: 'ID de la orden a la que pertenece el detalle',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @ApiProperty({
        example: 1,
        description: 'ID del producto',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number;
}