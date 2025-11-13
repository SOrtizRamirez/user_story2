// src/orders/order-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from '../products/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(
    () => Product,
    (product) => product.orderItems,
    { eager: true, onDelete: 'RESTRICT' },
  )
  product!: Product;

  @Column('int')
  quantity!: number;

  @Column('numeric', { precision: 12, scale: 2 })
  unitPrice!: string;

  @Column('numeric', { precision: 12, scale: 2 })
  lineTotal!: string;
}
