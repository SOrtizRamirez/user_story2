import { Entity, PrimaryGeneratedColumn, Column,  OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  address: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}

