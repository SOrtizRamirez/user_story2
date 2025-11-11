import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber({}, { message: 'El nombre debe ser un texto' })
  user_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El nombre debe ser un texto' })
  customer_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El nombre debe ser un texto' })
  product_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El nombre debe ser un texto' })
  total?: number;
}
