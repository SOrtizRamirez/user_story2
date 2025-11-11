import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  price: number;

  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;
}
