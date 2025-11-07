import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    clientId: number;
}