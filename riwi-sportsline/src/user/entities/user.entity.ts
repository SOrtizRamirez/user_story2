import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,  OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;
  
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

