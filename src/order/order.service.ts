import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = this.orderRepo.create(createOrderDto);
        return this.orderRepo.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepo.find();
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return order;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return this.orderRepo.save(order);
    }

    async remove(id: number): Promise<void> {
        const result = await this.orderRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Order #${id} not found`);
        }
    }
}
