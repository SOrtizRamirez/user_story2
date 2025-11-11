import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Producto no encontrado');
    }
    return customer;
  }

  async create(customerData: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return await this.customerRepository.save(customer);
  }

  async update(id: number, customerUpdate: Partial<UpdateCustomerDto>): Promise<Customer> {
  const customer = await this.findById(id);
  if (!customer) {
    throw new NotFoundException('Producto no encontrado');
  }
  Object.assign(customer, customerUpdate);
  return await this.customerRepository.save(customer);
}


  async remove(id: number): Promise<Customer> {
    const customer = await this.findById(id);
    if (!customer) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return await this.customerRepository.remove(customer);
  }
}
