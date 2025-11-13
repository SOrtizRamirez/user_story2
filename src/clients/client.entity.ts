// src/clients/client.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  documentNumber!: string; // CC/NIT/etc

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @OneToMany(() => Order, (order) => order.client)
  orders!: Order[];
}
