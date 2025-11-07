import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDetailDto {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsNumber()
    @Min(0)
    subtotal: number;

    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;
}