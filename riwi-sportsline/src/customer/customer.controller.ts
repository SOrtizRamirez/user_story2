import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';


@Controller('customers')
@UseInterceptors(LoggingInterceptor) // se aplica a todo el controlador
@UseGuards(RolesGuard)
export class CustomerController {
  //Inyectamos el servicio
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findById(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Post()
  @Roles('admin', 'user')
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: number, @Body() dto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  delete(@Param('id') id: number): Promise<Customer> {
    return this.customerService.remove(id);
  }
}
