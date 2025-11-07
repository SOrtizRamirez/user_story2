import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepo.create(createProductDto);
        return this.productRepo.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return this.productRepo.save(product);
    }

    async remove(id: number): Promise<void> {
        const result = await this.productRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product #${id} not found`);
        }
    }
}

