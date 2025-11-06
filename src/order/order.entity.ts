import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { Client } from 'src/client/client.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product;

    @ManyToOne(() => Client, (client) => client.orders)
    client: Client;
}