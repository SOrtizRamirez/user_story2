import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository, Between } from 'typeorm';
import { Order } from './orders.entity';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  withManager(manager: EntityManager): OrdersRepository {
    const repo = new OrdersRepository(this.dataSource);
    // @ts-ignore
    repo.manager = manager;
    return repo;
  }

  /** Helper: crear OrderItem usando el manager del repo actual */
  createItem(partial: Partial<OrderItem>) {
    return this.manager.create(OrderItem, partial);
  }

  /** Detalle con relaciones útiles */
  findDetail(id: number) {
    return this.findOne({
      where: { id },
      relations: { client: true, user: true, items: { product: true } },
    });
  }

  /** Listado por cliente con items */
  findByClient(clientId: number, page = 1, limit = 10) {
    return this.find({
      where: { client: { id: clientId } },
      relations: { items: { product: true } },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  /** Rango por fecha de creación (incluye relaciones opcionales) */
  findByDateRange(from: Date, to: Date, withRelations = false) {
    return this.find({
      where: { createdAt: Between(from, to) },
      relations: withRelations ? { client: true, user: true, items: { product: true } } : undefined,
      order: { createdAt: 'DESC' },
    });
  }
}
