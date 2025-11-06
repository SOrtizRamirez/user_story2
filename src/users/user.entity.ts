import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';

import { Order } from '../orders/orders.entity';

export type UserRole = 'admin' | 'customer' | 'analyst';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 20, default: 'customer' })
  role!: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @OneToMany(() => Order, (order) => order.user, { cascade: false })
  orders!: Order[];
}

