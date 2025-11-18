import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Role } from '../roles/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column({ nullable: true })
  refreshTokenHash?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
