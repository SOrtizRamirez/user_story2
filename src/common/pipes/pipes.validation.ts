import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class CustomValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    const obj = plainToInstance(metatype, value);
    const errors = validateSync(obj, { whitelist: true });
    if (errors.length > 0) {
      throw new BadRequestException(errors.map(e => Object.values(e.constraints || {})).flat());
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
