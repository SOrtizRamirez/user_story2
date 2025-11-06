import { DataSource } from "typeorm";
import { OrderDetail } from "src/order/order-detail.entity";
import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";

export async function seedOrderDetails(dataSource: DataSource) {
    const repo = dataSource.getRepository(OrderDetail);
    const count = await repo.count();
    if (count > 0) {
        console.log("⚠️  Detalles de orden ya existen, seeder omitido.");
        return;
    }

    const orderRepo = dataSource.getRepository(Order);
    const productRepo = dataSource.getRepository(Product);

    const order = await orderRepo.findOneBy({ id: 1 });
    const product = await productRepo.findOneBy({ name: "Balón de fútbol" });

    if (!order || !product) {
        console.log("⚠️  Faltan datos base (orden o producto).");
        return;
    }

    const details = repo.create([
        { quantity: 2, unitPrice: Number(product.price), subtotal: 2 * Number(product.price), order, product },
    ]);

    await repo.save(details);
    console.log("✅ OrderDetails insertados correctamente.")
}