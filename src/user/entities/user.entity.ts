import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Order } from "src/order/order.entity";
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, { eager: true })
    role: Role;

    @Column({ nullable: true })
    refreshToken: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}