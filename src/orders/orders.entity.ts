// src/orders/orders.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Client, (client) => client.orders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  client!: Client;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItem[];

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  total!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
