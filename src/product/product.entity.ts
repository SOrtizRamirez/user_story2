import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "src/order/order.entity";
import { OrderDetail } from "src/order/order-detail.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column('int')
    stock: number;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}