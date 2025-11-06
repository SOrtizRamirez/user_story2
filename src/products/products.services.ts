import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async create(dto: Partial<Product>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(page = 1, limit = 10) {
    return this.repo.findActivePaginated(page, limit);
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Product not found');
    return item;
  }

  async update(id: number, dto: Partial<Product>) {
    await this.ensureExists(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async softDisable(id: number) {
    await this.ensureExists(id);
    await this.repo.update(id, { isActive: false });
    return { ok: true };
  }

  // Util
  private async ensureExists(id: number) {
    const exists = await this.repo.exist({ where: { id } });
    if (!exists) throw new NotFoundException('Product not found');
  }
}
