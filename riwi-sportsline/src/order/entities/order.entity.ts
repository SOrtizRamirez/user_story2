import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con usuario
  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  // Relación con cliente
  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: false })
  customer: Customer;

  // Relación con productos
  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Product[];

  // Total de la orden
  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
  total: number;
}
