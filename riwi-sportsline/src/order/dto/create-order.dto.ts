import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'El precio debe ser un número' })
  user_id: number;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  customer_id: number;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  product_id: number;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  total: number;

}
