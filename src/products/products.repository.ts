import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, ILike, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  /** Rebind al EntityManager de una transacción */
  withManager(manager: EntityManager): ProductsRepository {
    const repo = new ProductsRepository(this.dataSource);
    // @ts-ignore — rebind manager/metadata internamente
    repo.manager = manager;
    return repo;
  }

  findActivePaginated(page = 1, limit = 10) {
    return this.find({
      where: { isActive: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  findBySku(sku: string) {
    return this.findOne({ where: { sku } });
  }

  searchByName(term: string, page = 1, limit = 10) {
    return this.find({
      where: { name: ILike(`%${term}%`) },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }
}
