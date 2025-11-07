// src/orders/dtos/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested, IsOptional } from 'class-validator';

class OrderItemInput {
  @Type(() => Number) @IsInt() @Min(1)
  productId!: number;

  @Type(() => Number) @IsInt() @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @Type(() => Number) @IsInt() @Min(1)
  clientId!: number;             

  @IsOptional()
  @Type(() => Number) @IsInt() @Min(1)
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];
}
