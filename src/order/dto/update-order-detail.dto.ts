import { IsNumber, IsOptional, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "./create-order-detail.dto";

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
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
        example: 34.99,
        description: 'Nuevo precio unitario (opcional)',
        minimum: 0,
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    unitPrice?: number;

    @ApiProperty({
        example: 104.97,
        description: 'Nuevo subtotal (opcional, se puede calcular automáticamente)',
        minimum: 0,
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    subtotal?: number;

    @ApiProperty({
        example: 2,
        description: 'Nuevo ID de producto (opcional)',
        required: false
    })
    @IsNumber()
    @IsOptional()
    productId?: number;
}