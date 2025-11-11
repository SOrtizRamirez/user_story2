import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async create(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async update(id: number, productUpdate: Partial<UpdateProductDto>): Promise<Product> {
  const product = await this.findById(id);
  if (!product) {
    throw new NotFoundException('Producto no encontrado');
  }
  Object.assign(product, productUpdate);
  return await this.productRepository.save(product);
}


  async remove(id: number): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return await this.productRepository.remove(product);
  }
}
