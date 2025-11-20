import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrdersRepository } from './orders.repository';
import { ClientsRepository } from '../clients/clients.repository';
import { ProductsRepository } from '../products/products.repository';
import { Order } from './orders.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto,  GetOrdersDto } from "../dtos/create-order.dto";
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
type AddItemDto = { orderId: number; productId: number; quantity: number };

@UseGuards(JwtAuthGuard)  
@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly ordersRepo: OrdersRepository,
    private readonly clientsRepo: ClientsRepository,
    private readonly productsRepo: ProductsRepository,
  ) {}

  async create(dto: CreateOrderDto) {
    if (!dto.items?.length) {
      throw new BadRequestException('Order must contain at least one item');
    }

    return this.dataSource.transaction(async (manager) => {
      const clientsRepo = this.clientsRepo.withManager(manager);
      const productsRepo = this.productsRepo.withManager(manager);
      const ordersRepo = this.ordersRepo.withManager(manager);

      const client = await clientsRepo.findOne({ where: { id: dto.clientId } });
      if (!client) throw new BadRequestException('Invalid client');

      const items: OrderItem[] = [];
      let total = 0;

      for (const i of dto.items) {
        const product = await productsRepo.findOne({
          where: { id: i.productId, isActive: true },
        });
        if (!product) {
          throw new BadRequestException(`Invalid product ${i.productId}`);
        }
        if (i.quantity <= 0) {
          throw new BadRequestException('Quantity must be > 0');
        }

        const unitPrice = Number(product.price);
        const lineTotal = unitPrice * i.quantity;
        total += lineTotal;

        const item = ordersRepo.createItem({
          product,
          quantity: i.quantity,
          unitPrice: unitPrice.toFixed(2),
          lineTotal: lineTotal.toFixed(2),
        });
        items.push(item);
      }

      const order = ordersRepo.create({
        client,
        user: dto.userId ? ({ id: dto.userId } as any) : null,
        items,
        total: total.toFixed(2),
      } as Order);

      return ordersRepo.save(order);
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: { client: true, user: true, items: { product: true } },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  findAllByClient(clientId: number, page = 1, limit = 10) {
    return this.ordersRepo.find({
      where: { client: { id: clientId } },
      relations: { items: { product: true } },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async addItem(dto: AddItemDto) {
    return this.dataSource.transaction(async (manager) => {
      const ordersRepo = this.ordersRepo.withManager(manager);
      const productsRepo = this.productsRepo.withManager(manager);

      const order = await ordersRepo.findOne({
        where: { id: dto.orderId },
        relations: { items: { product: true } },
      });
      if (!order) throw new NotFoundException('Order not found');

      const product = await productsRepo.findOne({
        where: { id: dto.productId, isActive: true },
      });
      if (!product) throw new BadRequestException('Invalid product');

      if (dto.quantity <= 0) {
        throw new BadRequestException('Quantity must be > 0');
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * dto.quantity;

      const newItem = ordersRepo.createItem({
        order,
        product,
        quantity: dto.quantity,
        unitPrice: unitPrice.toFixed(2),
        lineTotal: lineTotal.toFixed(2),
      });

      await manager.getRepository(OrderItem).save(newItem);

      const total = await this.recalculateTotal(manager, Number(order.id));
      await manager.update(Order, { id: order.id }, { total: total.toFixed(2) });

      return ordersRepo.findOne({
        where: { id: order.id },
        relations: { client: true, user: true, items: { product: true } },
      });
    });
  }

  async removeItem(orderId: number, itemId: number) {
    return this.dataSource.transaction(async (manager) => {
      const ordersRepo = this.ordersRepo.withManager(manager);

      const order = await ordersRepo.findOne({
        where: { id: orderId },
        relations: { items: true },
      });
      if (!order) throw new NotFoundException('Order not found');

      const affected = await manager.getRepository(OrderItem).delete({ id: itemId, order: { id: orderId } });
      if (!affected.affected) throw new NotFoundException('Item not found');

      const total = await this.recalculateTotal(manager, orderId);
      await manager.update(Order, { id: orderId }, { total: total.toFixed(2) });

      return ordersRepo.findOne({
        where: { id: orderId },
        relations: { client: true, user: true, items: { product: true } },
      });
    });
  }

  private async recalculateTotal(manager: any, orderId: number): Promise<number> {
    const repo = manager.getRepository(OrderItem);
    const items = await repo.find({ where: { order: { id: orderId } } });
    return items.reduce((acc, it) => acc + Number(it.lineTotal || 0), 0);
  }

   async findAll(filters: GetOrdersDto) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    const where: any = {};

    if (filters.clientId) {
      where.client = { id: filters.clientId };
    }

    return this.ordersRepo.find({
      where,
      relations: { client: true, user: true, items: { product: true } },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

}
