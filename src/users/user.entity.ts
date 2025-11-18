import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Role } from '../common/enums/role.enum';


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

  @Column({
  type: 'enum',
  enum: Role,
  default: Role.CLIENT
  })
  @JoinColumn({ name: 'role' })
  role!: Role;

  @Column({ nullable: true })
  refreshTokenHash?: string

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

}
