// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { OrderItem } from '../orders/order-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ unique: true })
  sku?: string;

  @Column()
  name?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('numeric', { precision: 12, scale: 2 })
  price?: string;

  @Column({ default: true })
  isActive?: boolean;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems?: OrderItem[];
}
