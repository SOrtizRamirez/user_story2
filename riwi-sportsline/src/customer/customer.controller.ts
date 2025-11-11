import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller('customers')
export class CustomerController {
  //Inyectamos el servicio
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Customer> {
    return this.customerService.remove(id);
  }
}
