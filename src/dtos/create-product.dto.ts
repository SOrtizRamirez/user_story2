import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty() @Length(3, 50) sku?: string;
  @IsString() @IsNotEmpty() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsNumberString() price?: string; 
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateProductDto {
  @IsOptional() @IsString() @Length(3, 50) sku?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumberString() price?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
