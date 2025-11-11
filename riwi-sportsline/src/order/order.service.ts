import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Orden no encontrado');
    }
    return order;
  }

  async create(orderData: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return await this.orderRepository.save(order);
  }

  async update(id: number, orderUpdate: Partial<UpdateOrderDto>): Promise<Order> {
  const order = await this.findById(id);
  if (!order) {
    throw new NotFoundException('Orden no encontrado');
  }
  Object.assign(order, orderUpdate);
  return await this.orderRepository.save(order);
}


  async remove(id: number): Promise<Order> {
    const order = await this.findById(id);
    if (!order) {
      throw new NotFoundException('Orden no encontrado');
    }
    return await this.orderRepository.remove(order);
  }
}
