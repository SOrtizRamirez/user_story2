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

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Client, (client) => client.orders, { nullable: false, onDelete: 'RESTRICT' })
  client?: Client;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true, onDelete: 'SET NULL' })
  user?: User; // vendedor que registró la orden

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items?: OrderItem[];

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  total?: string;

  @CreateDateColumn()
  createdAt?: Date;
}
