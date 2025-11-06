import { DataSource } from "typeorm";
import { Order } from "src/order/order.entity";
import { User } from "src/user/user.entity";
import { Client } from "src/client/client.entity";
import { Product } from "src/product/product.entity";

export async function seedOrders(dataSource: DataSource) {
    const repo = dataSource.getRepository(Order);
    const count = await repo.count();
    if (count > 0) {
        console.log("⚠️  Órdenes ya existen, seeder omitido.");
        return;
    }

    const userRepo = dataSource.getRepository(User);
    const clientRepo = dataSource.getRepository(Client);
    const productRepo = dataSource.getRepository(Product);

    const user = await userRepo.findOneBy({ email: 'admin@mail.com' });
    const client = await clientRepo.findOneBy({ email: 'carlos@mail.com'});
    const product = await productRepo.findOneBy({ name: 'Balón de fútbol'});

    if(!user || !client || !product) {
        console.log('⚠️  Datos base faltantes (user, client o product).')
        return;
    }

    const orders = repo.create([
        { quantity: 2, user, client, product },
    ]);

    await repo.save(orders);
    console.log("✅ Órdenes insertadas correctamente.");
}